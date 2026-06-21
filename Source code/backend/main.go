package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/rs/cors"

	"github.com/joho/godotenv"
	"github.com/lib/pq"
)

var db *sql.DB

type User struct {
	ID             int    `json:"id"`
	Username       string `json:"username"`
	KnowledgeScore int    `json:"knowledge_score"`
}

type createUserRequest struct {
	Username string `json:"username"`
	SurveyID string `json:"survey_id"`
}

type updateKnowledgeScoreRequest struct {
	Username string `json:"username"`
	Score    int    `json:"score"`
}

type updateClickCounterRequest struct {
	Counter     int    `json:"count"`
	Username    string `json:"username"`
	Featurename string `json:"featurename"`
}

type updateChapterDurationsRequest struct {
	Username  string    `json:"username"`
	Durations []float64 `json:"durations"`
}

type updatePosttestSurveyIDRequest struct {
	Username string `json:"username"`
	SurveyID string `json:"survey_id"`
}

type updateBtnClickTimestampsRequest struct {
	Username   string `json:"username"`
	Timestamps []int  `json:"timestamps"`
	BtnType    string `json:"btn_type"`
}

const initQuery = `
CREATE TABLE IF NOT EXISTS users (
	id SERIAL PRIMARY KEY NOT NULL,
	username TEXT NOT NULL UNIQUE,
	knowledge_score INT DEFAULT 0,
	leaderboard_counter INT DEFAULT 0,
	badge_counter INT DEFAULT 0,
	knowledge_meter_counter INT DEFAULT 0,
	chapter_durations FLOAT[] DEFAULT '{}'
);

ALTER TABLE users ADD COLUMN IF NOT EXISTS pretest_survey_id TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS posttest_survey_id TEXT;

ALTER TABLE users ADD COLUMN IF NOT EXISTS next_btn_click_timestamps FLOAT[] DEFAULT '{}';
ALTER TABLE users ADD COLUMN IF NOT EXISTS prev_btn_click_timestamps FLOAT[] DEFAULT '{}';
`

func health(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, "The game is on")
}

func createUser(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		fmt.Fprintf(w, "Method not allowed")
		return
	}

	var reqBody createUserRequest
	err := json.NewDecoder(r.Body).Decode(&reqBody)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, "Invalid request body")
		return
	}
	username := reqBody.Username

	if username == "" {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, "Username is required")
		return
	}

	_, err = db.Exec("INSERT INTO users (username, pretest_survey_id) VALUES ($1, $2)", username, reqBody.SurveyID)
	if err != nil {
		if err.Error() == "pq: duplicate key value violates unique constraint \"users_username_key\"" {
			w.WriteHeader(http.StatusConflict)
			fmt.Fprintf(w, "Username already exists")
			return
		}
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "Error creating user")
		return
	}

	user, err := db.Query("SELECT id, username, knowledge_score FROM users WHERE username = $1", username)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "Error retrieving user")
		return
	}
	defer user.Close()

	userInstance := User{}
	for user.Next() {
		err = user.Scan(&userInstance.ID, &userInstance.Username, &userInstance.KnowledgeScore)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			fmt.Fprintf(w, "Error retrieving user")
			return
		}
	}

	w.WriteHeader(http.StatusCreated)
	http.Header.Add(w.Header(), "content-type", "application/json")
	err = json.NewEncoder(w).Encode(&userInstance)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "Error sending response")
		return
	}
}

func getUsers(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		w.WriteHeader(http.StatusMethodNotAllowed)
		fmt.Fprintf(w, "Method not allowed")
		return
	}

	users, err := db.Query("SELECT id, username, knowledge_score FROM users ORDER BY knowledge_score DESC")
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "Error retrieving users")
		return
	}
	defer users.Close()

	usersList := []User{}
	for users.Next() {
		user := User{}
		err = users.Scan(&user.ID, &user.Username, &user.KnowledgeScore)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			fmt.Fprintf(w, "Error retrieving users")
			return
		}
		usersList = append(usersList, user)
	}

	w.WriteHeader(http.StatusOK)
	http.Header.Add(w.Header(), "content-type", "application/json")
	err = json.NewEncoder(w).Encode(&usersList)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "Error sending response")
		return
	}
}

func updateKnowledgeScore(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		fmt.Fprintf(w, "Method not allowed")
		return
	}
	var reqBody updateKnowledgeScoreRequest
	err := json.NewDecoder(r.Body).Decode(&reqBody)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, "Invalid request body")
		return
	}
	username := reqBody.Username
	score := reqBody.Score
	_, err = db.Exec("UPDATE users SET knowledge_score = $1 WHERE username = $2", score, username)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "Error updating knowledge score")
		return
	}
	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, "User knowledge score updated successfully")
}

func updateChapterDurations(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		fmt.Fprintf(w, "Method not allowed")
		return
	}

	var reqBody updateChapterDurationsRequest
	err := json.NewDecoder(r.Body).Decode(&reqBody)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, "Invalid request body")
		return
	}

	username := reqBody.Username
	durations := reqBody.Durations
	_, err = db.Exec("UPDATE users SET chapter_durations = $1 WHERE username = $2", pq.Array(durations), username)
	log.Println(pq.Array(durations))
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "Error updating chapter durations")
		return
	}
	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, "User's chapter durations updated successfully")
}

func updateClickCounter(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		fmt.Fprintf(w, "Method not allowed")
		return
	}

	var reqBody updateClickCounterRequest
	err := json.NewDecoder(r.Body).Decode(&reqBody)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, "Invalid request body")
		return
	}

	count := reqBody.Counter
	username := reqBody.Username
	featureName := reqBody.Featurename
	if featureName != "leaderboard" && featureName != "badge" && featureName != "knowledge_meter" {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, "Invalid feature name")
		return
	}

	queryStr := fmt.Sprintf("UPDATE users SET %s_counter = %d WHERE username = '%s'", featureName, count, username)
	_, err = db.Exec(queryStr)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "Error updating feature counter")
		return
	}

	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, "User feature counter updated successfully")
}

func updateBtnClickTimestamps(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		fmt.Fprintf(w, "Method not allowed")
		return
	}

	var reqBody updateBtnClickTimestampsRequest
	err := json.NewDecoder(r.Body).Decode(&reqBody)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, "Invalid request body")
		return
	}

	username := reqBody.Username
	timestamps := reqBody.Timestamps
	btnType := reqBody.BtnType
	if btnType != "next" && btnType != "prev" {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, "Invalid button type")
		return
	}

	queryStr := fmt.Sprintf("UPDATE users SET %s_btn_click_timestamps = $1 WHERE username = $2", btnType)
	_, err = db.Exec(queryStr, pq.Array(timestamps), username)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "Error updating button click timestamps")
		return
	}

	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, "User button click timestamps updated successfully")
}

func handlePosttestSurveyID(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		fmt.Fprintf(w, "Method not allowed")
		return
	}

	var reqBody updatePosttestSurveyIDRequest
	err := json.NewDecoder(r.Body).Decode(&reqBody)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, "Invalid request body")
		return
	}

	_, err = db.Exec("UPDATE users SET posttest_survey_id = $1 WHERE username = $2", reqBody.SurveyID, reqBody.Username)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "Error updating posttest survey ID")
		return
	}

	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, "User posttest survey ID updated successfully")
}

func main() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal(err)
	}

	DB_USERNAME := os.Getenv("DATABASE_USERNAME")
	DB_PASSWORD := os.Getenv("DATABASE_PASSWORD")
	DB_NAME := os.Getenv("DATABASE_NAME")
	DB_HOST := os.Getenv("DATABASE_HOST")
	DB_PORT := os.Getenv("DATABASE_PORT")

	connectionString := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=disable",
		DB_HOST,
		DB_USERNAME,
		DB_PASSWORD,
		DB_NAME,
		DB_PORT,
	)

	db, err = sql.Open("postgres", connectionString)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	err = db.Ping()
	if err != nil {
		log.Fatal(err)
	}

	_, err = db.Exec(initQuery)
	if err != nil {
		log.Fatal(err)
	}

	http.HandleFunc("/health", health)
	http.HandleFunc("/new", createUser)
	http.HandleFunc("/users", getUsers)
	http.HandleFunc("/update", updateKnowledgeScore)
	http.HandleFunc("/clickcounter", updateClickCounter)
	http.HandleFunc("/update-chapter-durations", updateChapterDurations)
	http.HandleFunc("/posttest-id", handlePosttestSurveyID)
	http.HandleFunc("/update-btn-click-timestamps", updateBtnClickTimestamps)

	c := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:5173", "https://*.vercel.app"},
	})

	log.Println("Server running on port 8080")
	err = http.ListenAndServe(":8080", c.Handler(http.DefaultServeMux))
	if err != nil {
		log.Fatal(err)
	}

}

import { IoMdClose } from "react-icons/io";
const Badge = ({ chapter, onClose }: { chapter: number; onClose: () => void }) => {
  return (
    <div className="badge">
      <IoMdClose className="close-btn" size={30} onClick={onClose} />
      <img src={`/images/badges/${chapter}.png`} alt={`Badge for chapter ${chapter}`} />
      <div className="badge-label">Congratulations! You have won a new badge.</div>
    </div>
  );
};
export default Badge;

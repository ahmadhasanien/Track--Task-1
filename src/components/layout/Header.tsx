import editGridIcon from '../../assets/icons/edit-grid.png';
import './layout.css';

interface HeaderProps {
  isEditMode: boolean;
  onToggleEdit: () => void;
}

export function Header({ isEditMode, onToggleEdit }: HeaderProps) {
  return (
    <header className="header" dir="rtl">
      <h1 className="header__title">لوحة التحكم</h1>
      <button
        type="button"
        className={`header__edit-btn ${isEditMode ? 'header__edit-btn--active' : ''}`}
        onClick={onToggleEdit}
      >
        <img src={editGridIcon} alt="" className="header__edit-icon" width={16} height={16} />
        {isEditMode ? 'إنهاء التحرير' : 'تحرير'}
      </button>
    </header>
  );
}

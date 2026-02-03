import classnames from 'classnames';
import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { LeftSidebarItem, SIDEBAR_ITEMS } from '../../../../configs';
import { useLayoutAtom } from '../../../../stores';
import classes from './LeftSidebar.module.css';

export function LeftSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setIsOpenSecondSidebar } = useLayoutAtom();

  const handleItemClick = (item: LeftSidebarItem) => {
    if (location.pathname !== item.route) {
      navigate(item.route);
      setIsOpenSecondSidebar(true);
    } else {
      setIsOpenSecondSidebar((prev) => !prev);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center border-end w-100 h-100 bg-secondary bg-opacity-25">
      {SIDEBAR_ITEMS.map((item) => (
        <button
          key={item.route}
          title={item.label}
          onClick={() => handleItemClick(item)}
          className={classnames(
            'w-100 d-flex align-items-center justify-content-center btn btn-link text-secondary d-flex align-items-center mb-2 fs-5',
            {
              [classes.leftSidebarBtn]: true,
              [classes.active]: location.pathname === item.route,
            },
          )}
        >
          <i className={item.icon}></i>
        </button>
      ))}
    </div>
  );
}

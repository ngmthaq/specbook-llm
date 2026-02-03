import React from 'react';
import classes from './AppComingSoon.module.css';

export function AppComingSoon() {
  return (
    <div className={classes.comingSoonContainer}>
      <div className="container h-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="mb-5">
            <p className="fs-1 mb-4 text-muted">
              <i className="bi bi-boxes"></i>
            </p>
            <p className="fs-5 fw-bold mb-3">Something Great is Coming</p>
            <p className="text-muted">
              We are working hard to bring you an amazing experience. Stay tuned!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

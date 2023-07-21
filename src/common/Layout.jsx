import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div
      style={{
        minHeight: '100vh',
        position: 'relative',
        paddingBottom: '90px',
        boxSizing: 'border-box'
      }}
    >
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '24px',
          backgroundColor: '#000000',
          color: 'white'
        }}
      >
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
          로고
        </Link>
        <div
          style={{
            display: 'flex',
            gap: '12px'
          }}
        ></div>
      </header>
      {/* main */}
      <Outlet />
      <footer
        style={{
          marginTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '24px',
          backgroundColor: '#EEEEEE',
          color: 'black',
          position: 'absolute',
          bottom: 0,
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        <div>푸터 내용 와랄ㄹ라</div>
      </footer>
    </div>
  );
}

export default Layout;

import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';

function Layout() {
  return (
    <L.Wrap>
      <L.Header>
        <Link to="/">
          <L.Logo src="logo.png" />
        </Link>
      </L.Header>
      {/* main */}
      <Outlet />
      <L.Footer>
        <L.FootContents>
          Copyright 2023, All Rights Reserved <br /> ○🐟사조참치🐟 용인시 수지구 풍덕천로 33○
          <br />
          Character Personality Test
          <br />
          발행/편집:4조
        </L.FootContents>
      </L.Footer>
    </L.Wrap>
  );
}

export default Layout;

const L = {
  Wrap: styled.div`
    // min-height: 100vh;
    position: relative;
    // padding-bottom: 90px;
    box-sizing: border-box;
    white-space: pre-line;
  `,
  Header: styled.header`
    display: flex;
    justify-content: space-between;
    padding: 12px;
    background-color: #d6e8f9;
    color: white;
    a {
      color: white;
      text-decoration: none;
    }
  `,
  Logo: styled.img``,
  Footer: styled.footer`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background-color: #d6e8f9;
    color: black;
    position: relative;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
  `,

  FootContents: styled.div`
    text-align: center;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 10px;
    line-height: 1.5;
  `
};

//

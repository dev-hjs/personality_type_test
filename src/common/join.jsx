import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const join = function () {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [passward, setPassward] = useState('');
  return <div>join</div>;
};

export default join;

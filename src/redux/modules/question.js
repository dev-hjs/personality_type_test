import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  questions: [
    { id: 'question1', text: '질문 1' },
    { id: 'question2', text: '질문 2' }
    // 나머지 질문들도 추가
  ],
  checkedQuestions: []
};

const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    checkQuestion: (state, action) => {
      const questionId = action.payload;
      const isChecked = state.checkedQuestions.includes(questionId);

      if (isChecked) {
        state.checkedQuestions = state.checkedQuestions.filter((id) => id !== questionId);
      } else {
        state.checkedQuestions.push(questionId);
      }
    }
  }
});

export const { checkQuestion } = questionSlice.actions;
export default questionSlice.reducer;

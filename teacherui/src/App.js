import React from 'react';
import StudentsSidebar from './StudentsSidebar'

const students = [
  { id: 1, name: 'seokwonchoi', label: 'Seokwon Choi', color: '#9f2525' },
  { id: 2, name: 'kevinhuh', label: 'Kevin Huh', color: '#f5624d' },
  { id: 3, name: 'dorotheaschaan', label: 'Dorothea Schaan', color: '#2bce79' },
  { id: 4, name: 'minheeseo', label: 'Minhee Seo', color: '#34a65f' },
  { id: 5, name: 'jiwonyoon', label: 'Jiwon Yoon', color: '#0f8a5f' },

]

const App = () => {
  return (
    <div>
      <StudentsSidebar students={students} />
    </div>
  )
}

export default App;

const students = [
  { id: 20, name: 'riya', lastname: 'Singh' },
  { id: 24, name: 'ritika', lastname: 'Rout' },
  { id: 56, name: 'aliya', lastname: 'Sharma' },
  { id: 88, name: 'sapna', lastname: 'Kapoor' }
];

const studentsId = students.map(function (students) {
  return students.id;
});
console.log(studentsId);

const studentlastname = students.reduce(function (accumulator, students) {
  return accumulator + students.lastname;
}, 0);
console.log(studentlastname);

const names = [];
for (let i = 0; i < students.length; i++) {
  names.push(students[i].name.toUpperCase());
}
console.log(names);

const stuname = students.filter(stu => stu.name === 'riya');
console.log(stuname);

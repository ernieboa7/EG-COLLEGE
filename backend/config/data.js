import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const adminPassword = process.env.ADMIN_PASSWORD;

export const users = [
  {
    email: "admin@school.com",
    passwordHash: bcrypt.hashSync(adminPassword, 10),
    role: "admin",
  },
  {
    email: "teacher1@school.com",
    passwordHash: bcrypt.hashSync("teach123", 10),
    role: "teacher",
  },
];

export const departments = [
  { id: 1, name: "Computer Science", head: "Dr. Smith", building: "Block A", email: "cs@school.com" },
  { id: 2, name: "Mechanical Engineering", head: "Engr. John", building: "Block B", email: "mech@school.com" },
];

export const students = [
  {
    studentId: "STU001",
    firstName: "Jane",
    lastName: "Doe",
    email: "jane@student.com",
    department: "Computer Science",
    yearLevel: 4,
  },
  {
    studentId: "STU002",
    firstName: "Tom",
    lastName: "Lee",
    email: "tom@student.com",
    department: "Mechanical Engineering",
    yearLevel: 5,
  },
];

export const courses = [
  {
    id: 101,
    code: "CSC101",
    title: "Introduction to Programming",
    department: "Computer Science",
    teacherName: "Mr. Adams",
    capacity: 50,
    schedule: [{ day: "Monday", start: "09:00", end: "10:30", room: "CS101" }],
  },
  {
    id: 201,
    code: "MEC201",
    title: "Thermodynamics I",
    department: "Mechanical Engineering",
    teacherName: "Engr. Paul",
    capacity: 60,
    schedule: [{ day: "Tuesday", start: "11:00", end: "12:30", room: "ME201" }],
  },
];

export const libraryBooks = [
  {
    id: 1,
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    isbn: "9780262033848",
    department: "Computer Science",
    edition: "3rd",
    availableCopies: 5,
    tags: ["Algorithms", "Programming", "Data Structures"],
  },
  {
    id: 2,
    title: "Mechanical Design Handbook",
    author: "Myer Kutz",
    isbn: "9780071443866",
    department: "Mechanical Engineering",
    edition: "4th",
    availableCopies: 3,
    tags: ["Mechanics", "Design", "Engineering"],
  },
];

export const feeItems = [
  { id: 1, title: "Tuition", amount: 500, applicableLevels: [1,2,3,4,5,6] },
  { id: 2, title: "Lab Fee", amount: 150, applicableLevels: [4,5,6] },
];

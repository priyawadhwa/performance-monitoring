import { Mongo } from 'meteor/mongo';

export const Classrooms = new Mongo.Collection('classrooms');
Classrooms.insert({ name: 'demo class', location: 'Mumbai', noOfStudents: 5, owner: '-1', username: 'Dhrushil'});
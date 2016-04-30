import { Template } from 'meteor/templating';
import { Classrooms } from '/imports/api/classrooms.js'
import { Students } from '/imports/api/classrooms.js'
import './body.html'
//
Template.body.helpers({
    classrooms() {
        return Classrooms.find({owner: Meteor.userId()});
    }
});

Template.body.events({
  'submit .new-classroom'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    var newClass = {
        name: target.classroomName.value,
        location: target.classLocation.value,
        noOfStudents: target.noOfStudents.value,
    };
    // Insert a class into the collection
    console.log(newClass);
    Classrooms.insert({
        name: target.classroomName.value,
        location: target.classLocation.value,
        noOfStudents: target.noOfStudents.value,
        students: [],
        email: Meteor.user().emails[0].address,
        owner: Meteor.userId(),
        username: Meteor.user().username,
    });
    console.log(c);
    // Clear form
    $('.new-classroom')[0].reset();
  },

  'submit .new-student'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    var newStudent = {
        studentName: target.studentName.value,
        classroomName: target.whichClass.value,
    };
    // Insert a student into the collection
    console.log(target.studentName.value);
    Students.insert({
        studentName: target.studentName.value,
        classroomName: target.whichClass.value,
    });
    // Inserting the student into the associated class
    c = Classrooms.findOne({name: target.whichClass.value});
    console.log(c._id);
    Classrooms.update(c._id, {$inc: {noOfStudents: 1}, $push: {students: newStudent}});
    // Clear form
    $('.new-student')[0].reset();
  },

});
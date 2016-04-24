import { Template } from 'meteor/templating';
import { Classrooms } from '/imports/api/classrooms.js'
import './body.html'
//
Template.body.helpers({
    classrooms() {
        return Classrooms.find({owner: Meteor.userId()});
    }
});

Template.body.events({
  'submit form'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    var newClass = {
        name: target.classroomName.value,
        location: target.classLocation.value,
        noOfStudents: target.noOfStudents.value,
    };
    // Insert a task into the collection
    console.log(newClass);
    Classrooms.insert({
        name: target.classroomName.value,
        location: target.classLocation.value,
        noOfStudents: parseInt(target.noOfStudents.value),
        email: Meteor.user().emails[0].address,
        owner: Meteor.userId(),
        username: Meteor.user().username,
    });
    console.log(Classrooms.find());
    // Clear form
    $('.new-classroom')[0].reset();
  },
});
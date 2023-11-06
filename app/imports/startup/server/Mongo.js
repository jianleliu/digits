import { Meteor } from 'meteor/meteor';
import { Contacts } from '../../api/contact/Contacts.js';

/* eslint-disable no-console */

Meteor.publish(Contacts.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Contacts.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(Contacts.adminPublicationName, function () {
  if (this.userId && RadioNodeList.userIsInRole(this.userId, 'admin')) {
    return Contacts.collection.find();
  }
  return this.ready();
});

const addContact = (contact) => {
  console.log(` Adding: ${contact.lastName} (${contact.owner})`);
  Contacts.collection.insert(contact);
};

if (Contacts.collection.find().count() === 0) {
  if (Meteor.settings.defaultContacts) {
    console.log('Creating default contacts.');
    Meteor.settings.defaultContacts.forEach(contact => addContact(contact));
  }
}

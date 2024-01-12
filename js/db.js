db.collection('contacts').on











// // Add event listener to the form
// const addContactForm = document.getElementById('add-contact-form');
// addContactForm.addEventListener('submit', async (event) => {
//   event.preventDefault(); // Prevent the default form submission behavior

//   // Retrieve values from input fields
//   const name = document.getElementById('name').value;
//   const number = document.getElementById('number').value;

//   // Add contact to Firestore
//   try {
//     const docRef = await addDoc(collection(db, 'contacts'), {
//       name: name,
//       number: number
//     });
//     console.log('Contact added with ID: ', docRef.id);
//   } catch (error) {
//     console.error('Error adding contact: ', error);
//   }
// });
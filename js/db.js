// add new contact
const form = document.querySelector('form');
form.addEventListener('submit', evt => {
     evt.preventDefault();
     const contact = {
          name: form.name.value,
          number: form.numbers.value,
     };
     db.collection('contacts').add(contact)
          .catch(error => {
               console.log(error);
          })
     form.name.value = '';
     form.numbers.value = '';
})
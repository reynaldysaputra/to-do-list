import data from './data.js';

const cache_key = 'keyData';

class App {
     render1() {
          const inpt = document.querySelector('input');

          document.addEventListener('keypress', (mode) => {

               switch(mode.keyCode) {
                    case 13 :            
                         if(this.validateInput(inpt)) {
                              console.log('ok');
                              new ShowData(inpt).show();
                         }
                         break;
               }
               
          })
     }

     validateInput(inpt) {
          if(inpt.value == '') {
               Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text : 'Kamu belum mengisi to do list'
               });
          }else {
               inpt.value = '';
          }
     }
}

class ShowData {
     constructor(newData) {
          this.newData = newData;
     }

     show() {

          if(localStorage.getItem(cache_key) === null) {
               this.newData = [];
               console.log('ok');
          }else {
               this.newData = JSON.parse(localStorage.getItem(cache_key));

               this.newData.forEach((data) => console.log(data));
          }

          return this;
     }
}

new App().render1();

const cache_key = 'data';
let dataArry;

class App {
     render1() {
          const inpt = document.querySelector('input');

          // input 1
          inpt.addEventListener('keypress', (mode) => {
               switch(mode.keyCode) {
                    case 13 :            
                         this.renderInput(inpt);
                    break;
               }
          })

          // input 2
          document.addEventListener('click', (mode) => {
               const target = mode.target;
               const text = document.querySelectorAll('#sec1 p');

               if(target.classList.contains('removeAll')){
                    Swal.fire({
                         title : 'Heyy',
                         text: 'Apakah anda yakin ingin menghapus semua to do list anda ?',
                         icon: 'warning',
                         showCancelButton: true,
                         confirmButtonColor: '#3085d6',
                         cancelButtonColor: '#d33',
                         confirmButtonText: 'Ya, Hapus data',
                       }).then((result) => {
                         if (result.value) {
                           Swal.fire(
                             'Terhapus!',
                             'Anda berhasil menghapus semua to do list anda.',
                             'success'
                           )
                           new RemoveAll().removeItem();
                           inpt.value = '';
                         }
                       })
               }else if(target.classList.contains('add')){
                    this.renderInput(inpt);
               }else if(target.classList.contains('hapus')){       
                    new AppEngine().deleteToDo(dataArry, target);
                    new ShowData().show();
               }else if(target.classList.contains('complete')){
                    new AppEngine().completeToDo(dataArry, target);
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
               return inpt;
          }
     }

     renderInput(inpt) {
          if(this.validateInput(inpt)) {  
               new AppEngine().addToDo({text : inpt.value, delete : false, strikethrough : false, class : ''});
               inpt.value = '';
          }
     }
}

class ShowData {
     constructor(newData) {
          this.newData = newData;
     }

     show() {
          const validate = new ValidateLocalStorage();
          let ul = document.querySelector('ul');          

          if(validate) {
               dataArry = validate.validateLocal(this.newData);
               
               ul.innerHTML = '';

               dataArry.forEach((data, index) => {                    
                    if(data.delete != true) {
                         ul.innerHTML += `
                              <li>
                                   <section id="sec1">
                                        <i class="fa fa-circle-thin complete" data-number = ${index}></i>
                                        <p data-number = ${index} class="${(data.strikethrough != true ? '' : `croosText`)}"> ${data.text} </p>
                                   </section>
                                   <section id="sec2">
                                        <i class="fa fa-trash-o hapus" data-number = ${index++}></i>
                                   </section>
                              </li>
                         `;
                    }
               })
          }                    
          return this;
     }
}

class AppEngine {
     addToDo(dataNew) {          
          const validate = new ValidateLocalStorage();

          if(validate.validateLocal()) {
               dataArry.push(dataNew);
               localStorage.setItem(cache_key, JSON.stringify(dataArry));
               new ShowData().show();               
          }

          return this;
     }

     deleteToDo(dataNew, target) {
          dataNew[target.dataset.number].delete = true; 
          localStorage.setItem(cache_key, JSON.stringify(dataNew));
     }

     completeToDo(dataNew, target){
          target.classList.toggle('class');          
          dataNew[target.dataset.number].strikethrough = (target.classList.length === 4) ? true : false;
          dataNew[target.dataset.number].class = (target.classList.length === 4) ?  'croosText' : '';
          localStorage.setItem(cache_key, JSON.stringify(dataNew));
          target.nextElementSibling.className = dataNew[target.dataset.number].class;
               
          return this;
     }
}

class RemoveAll {
     removeItem() {
          const validate = new ValidateLocalStorage();

          if(validate.validateLocal()) {
               localStorage.removeItem(cache_key);
               new ShowData().show();
          }
     }
}

class ValidateLocalStorage {
     validateLocal() {
          if(localStorage.getItem(cache_key) !== null) {          
               dataArry =  JSON.parse(localStorage.getItem(cache_key));
          }else {
               dataArry = [];
          }      

          return dataArry;
     }
}

window.addEventListener('DOMContentLoaded', function(target) {
     const imgHeader = document.querySelector('#header img');
     const text = document.querySelectorAll('#sec1 p');
     let rdm = Math.floor(Math.random() * 3 + 1);

     new App().render1();
     new ShowData().show();     
     
     imgHeader.src = `img/bg${rdm}.jpg`
})

// <i class="${(data.strikethrough != true ? 'fa fa-circle-thin complete' : 'fas fa-check-circle complete')}" data-number = ${index}></i>

let btn = document.querySelector(".btn");
let showCases = document.querySelector(".showCase");
let fullAdress = document.querySelector(".fullAdress")
 let formatedAdress=document.querySelector(".formatedAdress")

let apiEndPoint= "https://api.opencagedata.com/geocode/v1/json";
let apiKey ="a83f041117f24e74b2e235ba14f797f7"





 const getUserCurrentAddress =  async (latitude,longitude)=>{

    let qurey= `${latitude},${longitude}`;
    let apiUrl=`${apiEndPoint}?key=${apiKey}&q=${qurey}&pretty=1`;

    try{

        const res= await fetch(apiUrl);

        const data= await res.json();

        const { city ,state,postcode,country } = data.results[0].components;
        
        fullAdress.textContent=`User Address ${city}, ${state}, ${postcode}, ${country},`
  
        formatedAdress.textContent=`User full address : ${data.results[0].formatted}`;

    }
    catch(error){
        console.log(error)

    }

} ;


btn.addEventListener("click", () => {
   
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        //console.log(position);
        const { latitude ,longitude }= position.coords;
           
        showCases.textContent= `The Latitude ${latitude} 
        &  Longitude ${longitude} `;

        getUserCurrentAddress(latitude,longitude);


      },
      (error) => {
        showCases.textContent=alert("please allow ur location")
        
      }
    );
  }
});

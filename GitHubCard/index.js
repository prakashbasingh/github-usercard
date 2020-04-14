/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

axios.get('https://api.github.com/users/prakashbasingh')
.then (success => {
  // console.log(success.data)
// debugger
})
.catch(failure => {
  // console.log(failure)
})

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/




/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

// const followersArray = [  'tetondan', 'dustinmyers',  'justsml',  'luishrd',  'bigknell'];

const card = document.querySelector('.cards')

axios.get('https://api.github.com/users/prakashbasingh/followers')
  .then (success => {
        // console.log(success)
        // debugger
     success.data.forEach(item => { 
         // console.log(success)
        const followerURL = item.url 
        axios.get(followerURL)
          .then(success => {
        // console.log(success)
          const newFollowersCard = userCard(success.data)
        // console.log(success)
          card.appendChild(newFollowersCard)
          })
            .catch(failure => {
            console.log(failure)
          })
      })
    })
    .catch (
      failure =>{
      console.log(failure)
  })


       

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell

*/
 function userCard(object){
  // creating element
    const cardDiv = document.createElement('div')
    const userImg = document.createElement('img')
    const cardInfoDiv = document.createElement('div')
    const nameH3 = document.createElement('h3')
    const userNameP = document.createElement('p')
    const locationP = document.createElement('p')
    const profileP = document.createElement('p')
    const profileLink = document.createElement('a')
    const followerP = document.createElement('p')
    const followingP = document.createElement('p')
    const bioP = document.createElement('p')

    // creating element structure 
    cardDiv.appendChild(userImg)
    cardDiv.appendChild(cardInfoDiv)
    cardInfoDiv.appendChild(nameH3)
    cardInfoDiv.appendChild(userNameP)
    cardInfoDiv.appendChild(locationP)
    cardInfoDiv.appendChild(profileP)
    profileP.appendChild(profileLink)
    cardInfoDiv.appendChild(followerP)
    cardInfoDiv.appendChild(followingP)
    cardInfoDiv.appendChild(bioP)

    // giving class name/attributes
    cardDiv.classList.add('card')
    cardInfoDiv.classList.add('card-info')
    nameH3.classList.add('name')
    userNameP.classList.add('username')
    userImg.src = object.avatar_url
    profileLink.href = object.html_url
    // setting content
    nameH3.textContent = 'Name: ' + object.name
    userNameP.textContent = 'Username: ' + object.login
    locationP.textContent = 'Location: ' + object.location
    followerP.textContent = 'Follower: ' + object.followers
    followingP.textContent = 'Following: ' + object.following
    bioP.textContent = 'Bio: ' + object.bio

  return cardDiv
}

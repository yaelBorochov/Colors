  start1=0
  var myTimer//the timer of page to over to next page
  
  if(start1==0)//if its the first time to get to the page jump window of explanation
  {
    var openWin = document.getElementById("openningWindow");//open the window og explanation
    openWin.style.display = "block";
    
    function functioClose()//if user click start close that window
    { 
      start1++
      openWin.style.display = "none";
      if(start1!=0)
      {
        addLikeToQuote()//start game
        myTimer = setInterval(addLikeToQuote, 5000)
      }
    }      
  }
  
    var currentQuote
    var randomColor
    var poitsOfWin=0
    var check=poitsOfWin
    var interval 
    var audio = new Audio('rtqof-ma92o.m4a');//audio of "such a loser"
    var temp12=1
    var myMod = document.getElementById("myMod");
    myMod.style.display = "none";

    async function exit() //if user click exit so go to the last page with the points
    {
      speechSynthesis.cancel()//stop talking
      clearInterval(myTimer);//stop timer
      myMod.style.display = "block";//open the end page
      getPointUser()
      async function getPointUser() 
      {
        gmailMaxPoints = await axios.get('/get-user-max-points')//get the max point from the server
        var pointFromTxt = parseInt(gmailMaxPoints.data);
        var maxPoi = document.getElementById('maxPoint')
        maxPoi.innerHTML = gmailMaxPoints.data
        if(pointFromTxt<poitsOfWin)//if the new points max then the point in the server change the max point to the new point
        {
          updateMaxPoint()
           function  updateMaxPoint() 
          {
            var poitsOfWinSend=poitsOfWin
            const item={id:poitsOfWinSend}//send the max points to server
            axios.post('/add-point',item)
          }
        }
      }
         var endPoints = document.getElementById('endPoints')
         endPoints.innerHTML = poitsOfWin
    }

    async function myFunction(clickID) //when user clickd one option
    {
        let result1 = clickID.localeCompare("one");
        let result2 = clickID.localeCompare("two");
        let result3 = clickID.localeCompare("three");
        if(result1==0&&randomColor==0||result2==0&&randomColor==1||result3==0&&randomColor==2)//chack if he click the right one
           {
            poitsOfWin++//if yes get one point
           }
        else{//if no
          audio.play();//play audio of "such a loser"
          clearInterval(myTimer);//stop timer
          poitsOfWin=0//the point are 0
          if(poitsOfWin==0)
          {
            temp12=poitsOfWin
            var modal = document.getElementById("myModal");
            modal.style.display = "block";//open a window with face
          }
          myVar = setTimeout(closeWin, 1900)//after 1.9s close it and continue play
          function closeWin() 
          {
            if(poitsOfWin==0)
            {
              modal.style.display = "none";
            }
            temp12=1
            addLikeToQuote()
            myTimer = setInterval(addLikeToQuote, 5000);
          }
        }

        clearInterval(myTimer);
        if(temp12!=0)
        {
          myTimer = setInterval(addLikeToQuote, 5000);
          addLikeToQuote()
        }
        else{
          clearInterval(myTimer);
        }
        speechSynthesis.cancel()
    }
    
    async function addLikeToQuote() //function of the game page
    {
        var obj = [];
        var printOnsScreen = Array.from(Array(3), () => new Array(2));//make array of 3 place
        obj = await axios.get('/api/get-array-of-four-colors')//get the array of 4 colors from server
        myOneColor.innerHTML = obj.data[0].colorWord//pot the words of colors on screen
        myTwoColor.innerHTML = obj.data[1].colorWord//pot the words of colors on screen
        document.getElementById("quote-text1").style.color = obj.data[2].idOfColor;//pot the id of colors on screen
        document.getElementById("quote-text2").style.color = obj.data[3].idOfColor;//pot the id of colors on screen
        randomColor = Math.floor(Math.random() * 3)//random number from 1 to 3 to put the good result in the random index
        printOnsScreen[randomColor][0] = obj.data[2].colorWord;
        printOnsScreen[randomColor][1] = obj.data[3].colorWord;
        var tem=3
        var tem2=1
        for(var i=0; i<3; i++)
        {
            if(i!=randomColor)//put the rest colors in the rest index
            {
                printOnsScreen[i][0] = obj.data[tem].colorWord;
                printOnsScreen[i][1] = obj.data[tem2].colorWord;
                tem=1
                tem2=0
            }
        }
        oneBut.innerHTML = printOnsScreen[0][0]//put the array of 3 in the screen in order
        twoBut.innerHTML = printOnsScreen[0][1]
        threeBut.innerHTML = printOnsScreen[1][0]
        fourBut.innerHTML = printOnsScreen[1][1]
        fiveBut.innerHTML = printOnsScreen[2][0]
        sixBut.innerHTML = printOnsScreen[2][1]
        poitWin.innerHTML=poitsOfWin
        let text=obj.data[0].colorWord
        let text1=obj.data[1].colorWord
        let utterance= new SpeechSynthesisUtterance(text);//talk the txt colors
        let utterance1= new SpeechSynthesisUtterance(text1);
        myFunction2()
        function myFunction2() //speech
        {
          if(start1!=0)
          {
            speechSynthesis.speak(utterance);
            speechSynthesis.speak(utterance1);
          }
        }
        if(poitsOfWin!=check)//its mean the user didnt choose
        {
          if(poitsOfWin!=0)
          {
            poitsOfWin=poitsOfWin-1//if didnt choose -1
            poitWin.innerHTML=poitsOfWin
            check=poitsOfWin
          }
          else
          check=0
        }
     
        check++
        if (check-1!=poitsOfWin)
        {
          poitsOfWin++
        }
    
        if(start1==0)
        {
          check=poitsOfWin
        }
        
        if(start1==0)
        {
          clearInterval(myTimer);
        }
    }
    
    var myOneColor = document.getElementById('quote-text1')//put in screen the values
    var myTwoColor = document.getElementById('quote-text2')
    var oneBut = document.getElementById('lineOne')
    var twoBut = document.getElementById('lineTwo')
    var threeBut = document.getElementById('lineThree')
    var fourBut = document.getElementById('lineFour')
    var fiveBut = document.getElementById('lineFive')
    var sixBut = document.getElementById('lineSix')
    var poitWin = document.getElementById('poit')
    
    addLikeToQuote()
    myTimer = setInterval(addLikeToQuote, 5000)//after 5s replase page

    const HOURHAND = document.querySelector("#hour");//make clock
    const MINUTEHAND = document.querySelector("#minute");
    const SECONDHAND = document.querySelector("#second");
    var date = new Date();//from the date of today
    let hr = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();

    let hrPosition = (hr*360/12) + (min*(360/60)/12);
    let minPosition = (min*360/60) + (sec*(360/60)/60);
    let secPosition = sec*360/60;
    
    function runTheClock() 
    {
      hrPosition = hrPosition + (3/360);
      minPosition = minPosition + (6/60);
      secPosition = secPosition + 6;
 
      HOURHAND.style.transform = "rotate(" + hrPosition + "deg)";
      MINUTEHAND.style.transform = "rotate(" + minPosition + "deg)";
      SECONDHAND.style.transform = "rotate(" + secPosition + "deg)";
    }
    interval = setInterval(runTheClock, 1000);
    function functioClose() 
    {
      startGame.style.display = "none";
    }
    var slideIndex = 1;
    showSlides(slideIndex);
    function plusSlides(n) {
      showSlides(slideIndex += n);
    } 

    function currentSlide(n) {
      showSlides(slideIndex = n);
    }

    function showSlides(n) {
      var i;
      var slides = document.getElementsByClassName("mySlides");
      var dots = document.getElementsByClassName("dot");
      if (n > slides.length) {slideIndex = 1}    
      if (n < 1) {slideIndex = slides.length}
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[slideIndex-1].style.display = "block";  
      dots[slideIndex-1].className += " active";
    }
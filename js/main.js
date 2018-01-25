var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

// Moest mijn eigen toevoegen, want bij javascript doet hij raar als ik negatieve nummers
// als modulus doe. Bijvoorbeeld: -1 % 25 = -1
function mod(n, m) {
        return ((n % m) + m) % m;
}

//
// Caesar tabel
//

var tabelslider = document.getElementById("Range3");
var tabeloutput = document.getElementById("ValRange3");
tabeloutput.innerHTML = tabelslider.value; // Display the default slider value
var Caesartabelverschuifing = Number(tabelslider.value);
// Update the current slider value (each time you drag the slider handle)
tabelslider.oninput = function() {
    tabeloutput.innerHTML = this.value;
    Caesartabelverschuifing = Number(this.value);
}
function updateAlphabet() {
  var alphacount = 0;

  $('#Caesartable #outputrow td').each(function() {
    $(this).html(alphabet[(alphacount + Caesartabelverschuifing) % alphabet.length]);
    alphacount += 1;
   // $(this).css({"width":"40px"});
  });
}

$(function(){
  $("#Range3").on("propertychange change click keyup input paste", function(event) {
      updateAlphabet(); 
    });
});

//
// Caesar encoden
//

var slider = document.getElementById("Range1");
var output = document.getElementById("ValRange1");
output.innerHTML = slider.value; // Display the default slider value
var Caesarverschuifing = slider.value;
// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    output.innerHTML = this.value;
    Caesarverschuifing = this.value;
}

function updateCaesar(element) {
  // If value has changed...
  // Updated stored value
  element.data('oldVal', element.val());
  element.val(element.data('oldVal').toLowerCase());
  $('.Caesarontcijfer').data('oldVal', element.val());
  $('.Caesarontcijfer').val(Caesarcijfer(element.val(), Caesarverschuifing));
  $("#Caesaroutput").html(Caesarcijfer(element.val().toLowerCase(), Caesarverschuifing));
  $('.Caesarontcijfer').each(function() {
    updateCaesaront($(this));
    });
  //$("#Caesarontoutput").html(Caesarontcijfer(element.val().toLowerCase(), Caesarontverschuifing));
}

function Caesarcijfer(input, verschuif) {
  verschuif = Number(verschuif);
  var Caesaroutput = "";
  for (var i = 0; i < input.length; i++) {
    if (alphabet.indexOf(input[i]) != -1) {
      Caesaroutput += alphabet[(alphabet.indexOf(input[i]) + verschuif) % alphabet.length];
    } else {
      Caesaroutput += input[i];
    }
  }
  return Caesaroutput;
}

$(function() {
  $('.Caesarcijfer').each(function() {
    var elem = $(this);

    // Save current value of element
    elem.data('oldVal', elem.val());

    // Look for changes in the value
    $("#Range1").on("propertychange change click keyup input paste", function(event) {
      updateCaesar(elem);
      
    });
    elem.on("propertychange change click keyup input paste", function(event) {
      updateCaesar(elem);
    });
  });
});


//
// Caesar decoden
//

var slideront = document.getElementById("Range2");
var outputont = document.getElementById("ValRange2");
output.innerHTML = "0"; // Display the default slider value
var Caesarontverschuifing = slideront.value;
// Update the current slider value (each time you drag the slider handle)
slideront.oninput = function() {
    outputont.innerHTML = this.value;
    Caesarontverschuifing = this.value;
}


$(function() {
  $('.Caesarontcijfer').each(function() {
    var elem = $(this);


    // Look for changes in the value
    $("#Range2").on("propertychange change click keyup input paste", function(event) {
      updateCaesaront(elem);
    });
    elem.on("propertychange change click keyup input paste", function(event) {
      updateCaesaront(elem);
    });
  });
});

function updateCaesaront(element) {
  element.data('oldVal', element.val());
  element.val(element.data('oldVal').toLowerCase());
//   $('.Caesarcijfer').data('oldVal', element.val());
//   $('.Caesarcijfer').val(Caesarontcijfer(element.val().toLowerCase(), Caesarontverschuifing));
  $("#Caesarontoutput").html(Caesarontcijfer(element.val().toLowerCase(), Caesarontverschuifing));
//   $("#Caesaroutput").html(Caesarcijfer(element.val().toLowerCase(), Caesarverschuifing));
}

function Caesarontcijfer(input, verschuif) {
  verschuif = Number(verschuif);
  var Caesaroutput = "";
  for (var i = 0; i < input.length; i++) {
    if (alphabet.indexOf(input[i]) != -1) {
      Caesaroutput += alphabet[mod(alphabet.indexOf(input[i]) - verschuif, alphabet.length)];
    } else {
      Caesaroutput += input[i];
    }
  }
  return Caesaroutput;
}

//
// Vignère
//

var Vignèrezin, Vignèrewoord;

$(function() {
  updateVignère();
})

$(".Vignère").on("propertychange change click keyup input paste", updateVignère);

function updateVignère() {
  Vignèrezin = $('#Vignère #Codezin').val().toLowerCase();
  Vignèrewoord = $('#Vignère #Codewoord').val().toLowerCase();

  (Vignèrewoord.length === 0) ? $('#plus').css('display', 'none') : $('#plus').css('display', 'inline-block');

  var codewoordlang = "";

  $('#Vignère #Codezinoutput').html(Vignèrezin);

  for (var i = 0; i < Vignèrezin.length; i++) {
    (Vignèrewoord[i % Vignèrewoord.length] !== undefined) ? codewoordlang += Vignèrewoord[i % Vignèrewoord.length]: codewoordlang += "";
  }
  $('#Vignère #Codewoordoutput').html(codewoordlang);
  $('#Vignère #Vignèreoutput').html(Vignèreoutput(Vignèrezin, codewoordlang));
}

function Vignèreoutput(zin, woord) {
  var output = "";

  for (var i = 0; i < zin.length; i++) {
    if (alphabet.indexOf(zin[i]) != -1 && alphabet.indexOf(woord[i]) != -1) {
      output += alphabet[(alphabet.indexOf(zin[i]) + alphabet.indexOf(woord[i])) % alphabet.length];
    } else {
      output += zin[i];
    }
  }

  return output;
}

function encodeRot()
{
    var msg = document.getElementById("message3").value;
    var key = document.getElementById("selectNum").value;
    var matKey = Math.abs(key);
    var result = "";

    for(var i = 0; i < msg.length; i++)
    {
        var c = msg.charCodeAt(i);

        // handle uppercase letters
        if(c >= 65 && c <=  90) 
        {
            result += String.fromCharCode((c - 65 + matKey)% 26 + 65);
        // handle lowercase letters
        }
        else if(c >= 97 && c <= 122)
        {
            result += String.fromCharCode((c - 97 + matKey) % 26 + 97);
        // its not a letter, let it through
        }
        else 
        {
            result += msg.charAt(i);
        }
    }
    console.log(result);
    document.getElementById("message3").value = result;
} 


function decodeRot()
{
    var msg = document.getElementById("message3").value;
    var key = document.getElementById("selectNum").value;
    var matKey = Math.abs(key);
    var decodeKey = (26 - matKey) % 26;
    var result = "";

    for(var i = 0; i < msg.length; i++)
    {
        var c = msg.charCodeAt(i);

        // handle uppercase letters
        if(c >= 65 && c <=  90) 
        {
            result += String.fromCharCode((c - 65 + decodeKey) % 26 + 65); 
      
        // handle lowercase letters
        }
        else if(c >= 97 && c <= 122)
        {
            result += String.fromCharCode((c - 97 + decodeKey) % 26 + 97);
        // its not a letter, let it through
        }
        else 
        {
            result += msg.charAt(i);
        }
    }
    //console.log(key);
    document.getElementById("message3").value = result;
} 
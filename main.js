Array.prototype.clean = function(deleteValue)
{
        for (var i = 0; i < this.length; i++)
        {
                if (this[i][0] == deleteValue)
                { this.splice(i, 1); i--; }
        } return this;
};

function scroll()
{
window.scrollBy(0,20000);
}


setInterval(function(){scroll()}, 500);

function scrape()
{
var all_links = document.querySelectorAll('a');
var arr = []
var names=[]
for(var i=0; i<all_links.length;i++)
{  
if(all_links[i].href.endsWith("browse_search"))

 {
   arr.push(all_links[i].href.toString());
   names.push(all_links[i].innerHTML)
  }

 }
for(var i=0;i<names.length;i++)
{
        if(names[i].search('<')!=-1)
                names[i]=names[i].slice(0,names[i].search('<'));
}

for(var i=0;i<arr.length;i++)
{
        if(arr[i].search('ref')!=-1)
                arr[i]=arr[i].slice(0,arr[i].search('ref')-1);
}


var new_arr=[]
var new_name_array=[]
for(var j=0;j<arr.length;j=j+2)
    new_arr.push(arr[j]);
for(var j=1;j<names.length;j=j+2)
    new_name_array.push(names[j]);

MultiArray = new Array(new_arr.length);
        
for(var j=0;j<arr.length;j++)
{
    MultiArray [j] = new Array(2);
    MultiArray [j][0] = new_arr[j];
    MultiArray [j][1] = new_name_array[j];
}
MultiArray.clean(undefined);
 
var csvContent = "data:text/csv;charset=utf-8,";
MultiArray.forEach(function(infoArray, index){

   dataString = infoArray.join("\n");
    csvContent += dataString + "\n";

});

var encodedUri = encodeURI(csvContent);
window.open(encodedUri);
}


time=window.prompt("Enter how many seconds to wait before starting scraping ",10);

function isEmpty(str) {
    return (!str || 0 === str.length);
}

if(isEmpty(time))
   {

window.setTimeout(function(){scrape()}, 15000);

}
else
{
window.setTimeout(function(){scrape()}, time*1000);
}

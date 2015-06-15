// Web Scraping Basic Coding using Cheerio and Request
var request = require('request'),
    cheerio = require('cheerio'),
	fs = require('fs'),
	movieLink = 'http://imcdb.org/movie.php?resultsStyle=asImages&sortBy=4&id=' + '415306',
	movieTitle = null,
    carTitle = [],
	carSrc = [],
	carLinks = [],
	numStar = [],
	comp = [],
	csvComp = [];
    
request (movieLink, function (err, resp, body) {
    if (!err && resp.statusCode ==200) {
        var $ = cheerio.load(body);
        $('img', 'div.Gallery').each(function(){
			var src = 'http://imcdb.org/' + $(this).attr('src');
			if (src.indexOf('res/star.png') == -1) {
				carSrc.push(src);
			}
		});	
		
		$('div.ThumbnailBox','div.Gallery').each(function(){
			var title = $(this).text();
			carTitle.push(title);
		});
		
		$('a.Thumbnail','div.Gallery').each(function(){
			var link = 'http://imcdb.org/' + $(this).attr('href');
			carLinks.push(link);
		});
		
		$('h1.BoxTitle','#MovieVehicles').each(function(){
			movieTitle = $(this).text();
			movieTitle = movieTitle.replace(' Movie,','');
		});
		
		$('span.Stars', 'div.ThumbnailBox').each (function () {
			var star = $(this).first().children('img').length + 1;
			numStar.push(star);
		});
		
		for (i=0;i<carTitle.length;i++) {
			comp.push(
				"<div style='width: 50%; margin: 0 auto;'><a href='" + carLinks[i] + "' target='_blank'><img src='" + carSrc[i] + "' height='150px'></a><br />" + Array(numStar[i]).join('*')  + "<br /><a href='" + carLinks[i] + "' target='_blank'><span style='font-size:14px; vertical-align:bottom; font-family:Gotham, 'Helvetica Neue', Helvetica, Arial, sans-serif'>" + carTitle[i] + "</span></a><br /></div><br /><br />" 
			);
		}
		
		for (i=0;i<carTitle.length;i++) {
			csvComp.push(
				 carTitle[i] + ',' + Array(numStar[i]).join('*') + '\n \t'
			);
		}
			
        fs.writeFile('TalladegaNights.html',
					 '<h1 style"font-family:Gotham, "Helvetica Neue", Helvetica, Arial, sans-serif">' + movieTitle + '</h1><br />' + comp.join(''),
					 function(err){
					 	console.log('html file successfully written!')	
					 });
					 
		fs.writeFile('TalladegaNights.csv',
					 movieTitle + csvComp.join(''),
					 function(err){
					 	console.log('excel file successfully written!')	
					 });
		console.log('THE TOP 10 CARS FROM: ' + movieTitle);
		console.log(csvComp.slice(0,10));
    }
});

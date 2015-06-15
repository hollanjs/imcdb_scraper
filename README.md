# imcdb_scraper
scrapes IMCDB for specific cars in movies and generates a CSV and HTML page based on the information. Car ranked in order of importance rather than name.

To run, navigate to the folder from the command line and run "node imcdb.js".

You'll notice that there are now 2 files in the folder from the movie Talladega Nights - a CSV and HTML file. This was meant to be a quick project for archiving car choices from movies in order of importance so not a lot has gone into making it look the best. Also, you'll notice you have to hard-code the ID into the imcdb.js file. to find the ID, go to IMCDB.org, search for the movie you would like, and when you are on the movie page, snag the ID from the end of the URL: http://imcdb.org/movie.php?id=415306  <-- these last numbers.

Copy and paste them into the imcdb.js link at the top of the file, save and run again.
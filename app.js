// Problem: We need a simple way to look at a user's badge count and JavaScript points
// Solution: Use Node.js to connect to Treehouse's API to get profile information to print out
// Require https module
const https = require("https");

// Print Error Messages
function printError(error) {
  console.error(error.message);
}

// Function to print message to console
function printMessage(username, badgeCount, points) {
  const message = `${username} has ${badgeCount} total badges and ${points} points in Javascript`;
  console.log(message);
}

function getProfile(username) {
  try {
    // Connect to the API url https://teamtreehouse.com/garretthensley.json
    const request = https.get(
      `https://teamtreehouse.com/${username}.json`,
      (response) => {
        if (response.statusCode === 200) {
          // Read data
          let body = "";
          response.on("data", (data) => {
            body += data.toString();
          });

          response.on("end", () => {
            try {
              // Parse the data
              const profile = JSON.parse(body);
              printMessage(
                username,
                profile.badges.length,
                profile.points.JavaScript
              );
            } catch (error) {
              printError(error);
            }
          });
        } else {
          const message = `There was an error getting the profile for ${username} ${response.statusCode}`;
          const statusCodeError = new Error(message);
          printError(statusCodeError);
        }
        // Print the data
      }
    );

    request.on("error", (error) =>
      printError(`Problem with request ${error.message}`)
    );
  } catch (error) {
    printError(error);
  }
}

const users = process.argv.slice(2);

users.forEach(getProfile);

// Read data
// Parse the data
// Print the data

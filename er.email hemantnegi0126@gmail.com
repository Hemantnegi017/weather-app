[33mcommit a123b2d431d54fc54350fea4d7bff32dfb38bf79[m[33m ([m[1;36mHEAD[m[33m -> [m[1;32mmain[m[33m, [m[1;31morigin/main[m[33m)[m
Author:     Hemant Negi <rahul.work0715@gmail.com>
AuthorDate: Thu Jul 30 01:17:32 2026 +0530
Commit:     Hemant Negi <rahul.work0715@gmail.com>
CommitDate: Thu Jul 30 01:17:32 2026 +0530

    added readme

[1mdiff --git a/README.md b/README.md[m
[1mnew file mode 100644[m
[1mindex 0000000..07cd5b5[m
[1m--- /dev/null[m
[1m+++ b/README.md[m
[36m@@ -0,0 +1,40 @@[m
[32m+[m[32m# Weather App 🌦️[m
[32m+[m
[32m+[m[32mA responsive weather application that shows real-time weather information for any city using an API.[m
[32m+[m
[32m+[m[32m## Features[m
[32m+[m
[32m+[m[32m- Search weather by city name[m
[32m+[m[32m- Get current location weather[m
[32m+[m[32m- Shows temperature, humidity, wind speed[m
[32m+[m[32m- Weather condition icons[m
[32m+[m[32m- Loading and error handling[m
[32m+[m[32m- Responsive design for mobile and desktop[m
[32m+[m
[32m+[m[32m## Technologies Used[m
[32m+[m
[32m+[m[32m- HTML[m
[32m+[m[32m- CSS[m
[32m+[m[32m- JavaScript[m
[32m+[m[32m- Weather API[m
[32m+[m
[32m+[m[32m## How to Run[m
[32m+[m
[32m+[m[32m1. Clone this repository[m
[32m+[m
[32m+[m[32m2. Open `index.html` in your browser[m
[32m+[m
[32m+[m[32m## Project Preview[m
[32m+[m
[32m+[m[32m(Add your screenshot here)[m
[32m+[m
[32m+[m[32m## Future Improvements[m
[32m+[m
[32m+[m[32m- Add dark mode[m
[32m+[m[32m- Add weather forecast[m
[32m+[m[32m- Improve UI animations[m
[32m+[m[32m- Add more weather details[m
[32m+[m
[32m+[m[32m## Author[m
[32m+[m
[32m+[m[32mHemant Negi[m
\ No newline at end of file[m

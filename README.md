# Zammad search text modules from Google Spreadsheet

A set of tiny scripts to work around the lack of a search tools in Zammad admin console. 

# How does it work?

1. Create a new Google Spreadsheet (https://spreadsheet.new/)
2. Rename the first tab "get user roles"
3. Rename the second tab "get groups"
4. Rename the third tab "get text modules"
5. Select Extensions > App Script
6. Paste the three scripts
7. Active a trigger for the "Get groups" to work. (on open > groupCheck)

A new "Custom functions" menu item will show up on the far right of the standard menu.

# To do

* Better search in get text modules and in get user roles
* Auto-setup of tabs and tabs names
* Better and centralized url and token handlings
* Centralize menu creation

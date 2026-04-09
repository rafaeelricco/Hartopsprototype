# HART Agency — SharePoint Document Corpus

# Source: OneDrive-SharedLibraries-HartAgencyNY / Ambar-HART Teams Site - Documents

# Generated: 2026-03-18

# Total documents processed: 31 files (12 docx, 6 pdf, 4 xlsx, 5 png, 1 pptx, 2 mp4 [skipped], 1 vsdx [skipped])

================================================================================
TABLE OF CONTENTS
================================================================================

## Section 1: HEMs Master Documentation (docx)

## Section 2: Technical Outlines (docx)

- HART Portal Pilot (Affiliate Build) Outline
- yourHART Enhancement - Manager Event Cancellation Process
- yourHART Enhancement - Account Management
- yourHART Enhancement - Educator Management System
- HART AI Survey App Outline
- HART Data Profile Consumer Outline
- HART Data Profile Accounts Outline

## Section 3: HEMs Process & Questionnaire Documents (docx)

- CAMPARI Picklist Questionnaire
- SOHO Off/On Premise Event Questions
- Questionnaire HEMS Enhancements Requirements
- Manager HEMs Process Capture (Katie)

## Section 4: PDF Documents

- Evaluation Report (TOPS Adirondack Creamery)
- SGWS AB Beer Survey (Oct 2025)
- SQL Database Schema
- Event Form (portal.myhems.com)
- HART Platform V1 Build - Ambar Outline (Jan 2026)
- HEMs AI and AWS Notes

## Section 5: Spreadsheet Data (xlsx)

- WAGNER 2025 Event Schedule
- Campari Answers
- HEMs Enhancement Questionnaire
- HEMs Platform Capabilities Matrix

## Section 6: Image Descriptions (png)

- Screenshots and Event Report Form templates

## Section 7: Presentation (pptx)

- SGWS Fall Holiday Survey Recap 2024

################################################################################
################################################################################

##

## SECTION 1: HEMS MASTER DOCUMENTATION

## Source: Hems x Master Documentation - 1-28-2025.docx

##

################################################################################
################################################################################

MyHems Documentation

User Types and Permissions 3
Events 5
View all Events 5
Recent Events 5
Add New Event 5
Deleted Events 7
My Events 7
Today's event 7
Event Report 7
Draft Events 7
Educators 8
View all Educators 8
Add Educator 8
Export Educators 9
Educator Availability 9
Evaluations 11
Evaluation Approval 11
Evaluation Detail Page 11
Surveys 12
My Ratings 13
Relations 14
Accounts 14
Add Account 14
Contacts 16
Add Contact 16
Distributors 17
Add Distributor 17
Distributor Detail Page 18
Products 19
Add Product 19
Product Detail Page 19
Suppliers 20
Add Supplier 20
Supplier Detail Page 21
Settings 22
User Access 22
Users 22
Regions 22
Territories 22
Knowledge Tags 22
Product Sizes 22
Programs 22
Product Types 22
Divisions 23
Hidden Events from Evaluations 23
SMS Report 23
Account Email Report 23
QuickBooks Logs 23
Export Promocodes 23
Notify App Update 23
Quickbooks Config 23
Mobile Settings 23
Mobile Application 24
MyHems Android App 24
MyHems iOS App 24
Login screen 25
Profile 25
Availability Module 25
Dashboard 26
Events 26
Evaluations 27
Evaluation Form 27
Event Results 28
Other Details 29
Surveys 29
Evaluation Actions 29
Ratings Menu 30
Integration 31
Google Map 31
Twilio 31
Quickbook 32

User Types and Permissions
There are two main user types within MyHems.

    •	Adminstrator
    •	Educator

Administrators can define granular access levels in User Access Settings.

Feature / Page
User type: Admin
User type: Educator
Events
Full access
Limited to:
View all events
Today's events
Educator
Full access
No access
Evaluation
Full access

    •	My evaluations are to be completed
    •	My pending manager approval
    •	Events to complete the evaluation
    •	Pending
    •	Approved

Limited to:

    •	Evaluations to complete
    •	Pending the manager's approval

Survey
Full access

    •	My surveys to complete
    •	My pending manager approval
    •	Events to complete the survey
    •	Pending
    •	Approved

Limited to:

    •	Surveys to complete
    •	Pending the manager's approval

Relation
Full access

Accounting
Full access

Reports
Full access

    •	Monthly events
    •	Premises-based events
    •	Distributor-based events
    •	Supplier-based events
    •	Account-based events
    •	Event Summary
    •	Product Inventory
    •	Event detailed report
    •	Educatory rating report
    •	Company sales report

Limited access

    •	Monthly events
    •	Premises-based events
    •	Distributor-based events
    •	Supplier-based events
    •	Account-based events
    •	Event Summary
    •	Product Inventory
    •	Event detailed report
    •	Educatory rating report

Settings
Full access

My availability
Full access
Full access
My Ratings
Full access
Full access

Events
View all Events
This module displays past, current, and future events.

Recent Events
This module displays all events created this month.
Add New Event
This module allows users to create new events. Populate the following fields when creating a new event:

Field Name
Description
Required
Premises
Options: Off Premises, On Premises, On Premise/SLA, Engraver/Calligrapher, Beer Off, Premises ON/Trade, Delivery, Dedicated Off, Dedicated On, Dedicated On/SLA, Cannabis, Mixology, Survey.
Yes
Linked Event
Allows the user to enter the name of a linked event.
No
Grand Tasting / Large Volume Store

No
Wet/Dry

No
Number of Educators
Total number of educators assigned to the event.
No
Date

Yes
Time

Yes
Approved or Special Event

No
Event Type
Options: Normal Event, Multi-Stop Primary, or Multi-Stop Secondary.

A Normal event has no dependencies.

A Multi-Stop Primary event is dependent on a Multi-Stop Secondary event.
No
Products

No
Distributor

Yes
Supplier

Yes
Account

Yes
Region
Auto-populated from the account address.
Yes
Territory
Auto-populated from the account address.
No
Event Hours\*
Duration of the Promo Bill Grouping. This field is read-only or auto-generated.
Yes
Bill To

No
Billing Address
An expandable section that captures billing address details
No
Bill To Contact

No
Bill Amount Per Ed

No
Max Ambassador Exp

No
Ambassador Expense

No
10% Supplemental Finance Charge

No
Supplies (Name, Cost)

No
M&E Expenses

No
Total Amount

No
Billing Company & Bank Account

No
Approval for Billing
Determines whether the event is available in the billing module.

If set to Yes, the event appears in billing; if set to No, it does not.
No

Evaluation form fields are event type-specific. Refer to the attached sheet for the fields associated with each event type.

Link:
https://docs.google.com/spreadsheets/d/1oWnivRkuAR9OAaNVJW1DYfyEZ3_wEvk4FzbENP-R59c/edit?usp=sharing

Deleted Events
This module displays deleted events. Events can be restored.
My Events
This module displays all events assigned to the logged-in user.
Today's event
This module displays events accepted and assigned for the current date.
The Check-In / Check-Out option is available when the event is about to start.
Event Report
This module allows users to create event reports using various filters.
Draft Events
This module provides a streamlined interface that lets managers quickly create draft events by prefilling event information and assigning them to educators later.

    •	Click the “Download Template File” button. A tooltip displays instructions and valid data for populating the template.
    •	Complete the template with the details of your upcoming event.
    •	Click Import to upload the template file.
    •	Map template file headers to system fields to populate the appropriate fields with data. 

Educators
View all Educators
This module displays all educators in the portal. Use the filters to search by specific criteria.

Add Educator
This module allows users to create new educators. If an educator has not worked for the company for more than 3 months for an event, they will become inactive.

Field Name
Notes
Required
First Name

Yes
Last Name

Yes
Cell Phone

Yes
Home Phone

No
Email

No
Website

No
Region

Yes
Territory

No
Address 1

Yes
Address 2

No
City

Yes
State

Yes
Zip

Yes
Facebook

No
Instagram

No
Twitter

No
Photo

No
Gender

Yes
Date of Birth

No
Languages Spoken
Saved internally as tags.
No
Hair Color

No
Eye Color

No
Tattoos

No
Referred By

No
How to Send Notifications
Preferred notification method for event updates: Text, Email, or Phone Call.
No
Event Type

No
Knowledge Tags
The list is managed in the admin settings
No
SSN
Must be unique per educator.
Yes
Hire Date

No
Pay Rate

No
Payroll QB Flag
Indicates whether the educator is managed in QuickBooks Payroll.
No
Status

No
Have Car

No

Export Educators
This button exports all educators within the portal.

Educator Availability
This module displays educator availability for managers. Use the filters to search for educators based on specific criteria.

Availability chart:
• Green - Available all day
• Green (with time) - Available for the specified time slot
• Red - Not available
• Grey question mark - Availability not updated

Evaluations
This module separates evaluations into four tabs:

    •	My Evaluations to Complete– Lists events assigned to the logged-in users with pending evaluations.
    •	My Pending Manager Approval– Lists evaluations submitted and awaiting manager approval.
    •	Events to Complete Evaluation– Lists evaluations not added or incomplete
    •	Pending– Evaluations awaiting manager approval
    •	Approved– Lists all approved evaluations

Evaluation Approval
This module allows managers to review and approve evaluations within the “Event to Complete Evaluation” tab.

Functions:
• Red X - Approve the evaluation
• + Icon - Create a blank evaluation (appears if the educator has not checked into the event)
• Eyeball - View the Evaluation Detail page
• Pencil Icon - Edit the evaluation
Evaluation Detail Page
Click the Eyeball Icon to open the Evaluation Detail page. Managers can view all submitted details. At the bottom of the page, the Feedback Form and Approve button are available.

Surveys
The module functions similarly to evaluations but displays only survey-based events.

    •	My Surveys to Complete– Lists events assigned to the logged-in user with pending surveys
    •	My Pending Manager Approval– Lists surveys submitted and awaiting manager approval
    •	Events to Complete Survey– Lists surveys not added or incomplete
    •	Pending– Lists surveys awaiting manager approval
    •	Approved– Lists all approved surveys

Note: Surveys are approved by default to save time.

Multi-stop events
Educators can now create multi-location events, allowing a single event to span a primary event and multiple secondary venues.

Structural Hierarchy :
• Primary (P): The starting event or the first location as the Primary (P) stop
• Secondary (S): The subsequent event is the secondary (S) stop. These are connected sequentially to the primary event rather than being created as a separate, standalone event.
How to create a multistop event
To create a primary event
To create a multistop event, create an event usingthe “Add Event button.”
Fill in the event details similar to normal events. While creating, take care that you mark the  “ Event Type = MultiStop Primary.”
This would create the primary event

To add a secondary event
Navigate to the primary event detail page. On the event detail page, you can see 3 columns. In the third column, please click the Add stop button to create a secondary event. This action will open a form with prefilled data from the primary event. You only need to update the educator, Supplier, and Distributor, and the event date and time

Features:
• You can dynamically add up to 5 secondary events using the Add Stop button
• An educator needs to only accept the first stop on the list of multi-stop events, and that'll accept all stops in the job
• An educator should have to check in and do reports for each stop.
• A primary event is usually marked with a P on the event listing page near the event name
• Whereas the secondary event is marked with an S on the event listing page near the event name.
• A multistop event has one bill for the combined events.

My Ratings
This module displays ratings assigned to the logged-in user based on events.

Relations

This module organizes entities into five categories:

    •	Accounts
    •	Contacts
    •	Distributors
    •	Products
    •	Suppliers

Accounts
This module displays all accounts in the portal. Filters are available to search by specific criteria. Administrators can view and edit accounts.

Add Account
The following fields are requested when creating a new account.

Field Name
Notes
Required
Company Name

Yes
Doing Business As
Alternate or trade name of the account, if applicable.
No
Account Affluency

No
Account Size
Size of the store in square footage.
No
Email

No
Phone

No
Fax

No
Cellphone

No
Logo

No
Website

No
Address 1

No
Address 2

No
City

No
State

No
Zip

No
Region

No
Territory

No
Manhattan Beer ID

No
Empire ID

No
Liquor License #

No
Opici ID

No
Winebow ID

No
Southern ID

No
TD LINKS

No
Transportation Notes

No
Private Admin Notes
Internal notes, visible only to administrators
No
On / Off Premises

No
Referred By

No
Activate Ratings
Enables account-level ratings
No
Status
Activates/deactivates the account (default: active)
No

Contacts
Contacts are individuals associated with an account, distributor, or supplier. Administrators can view, edit, delete, and log in as contacts.

Add Contact

Field Name
Description
Required
First Name

Yes
Last Name

No
Phone

No
Email Address

Yes
Address 1

No
Address 2

No
City

No
State

No
Zip

No
Region

No
Territory

No
Assign To
Select the account, distributor, or supplier
No
Type
Select the type of contact
Yes
Status
Activates/deactivates the contact (default: active)
No

Distributors
This module displays all distributors in the portal. Administrators can view and edit distributors.

Add Distributor

Field Name
Description
Required
Company Name

Yes
Office Phone

No
Email

No
Fax

No
Website

No
Address 1

No
Address 2

No
City

No
State

No
Zip

No
Region

No
Territory

No
Private Admin Notes
Internal administrative notes. Visible only to administrators.
No
Image

No
Referred By
Referral information associated with the distributor.
No
Status
Activates/deactivates the distributor (default: active)
No
Distributor Detail Page
This page allows administrators to manage distributor details.
Administrators can perform the following actions:
• Add a new contact to the distributor
• Add notes
Multiple contacts can be assigned to a distributor.
The Events tab displays all events associated with the distributor.
Notes are visible to all users with access to the distributor record.
Products
This module displays all products in the portal. Administrators can view and edit products.

Add Product

Field Name
Description
Required
Product Name

Yes
Type
Options: Beer, Sake, Spirits, and Wine.
No
Sub Type

No
Distributor

Yes
Supplier

Yes
Upload Image

No
Website

No
SKU

No
Product Summary

Yes
YouTube Video URL

No
Upload Docs (Sales Sheets)
Documents related to the product. These details will get linked within an event.
No
Status
Activates or deactivates the product (default: active)
No

Product Detail Page
This page displays detailed information about the selected product.
At the bottom of the page, the Events tab displays all events associated with the product.

Suppliers
This module displays all suppliers in the portal. Administrators can view and edit suppliers.

Add Supplier

Field Name
Description
Required
Type

Yes
Company

Yes
Email

No
Office Phone

No
Fax

No
Website

No
Address 1

No
Address 2

No
City

No
State

No
Zip

No
Region

No
Territory

No
Private Admin Notes
Internal administrative notes. Visible only to administrators.
No
Image

No
Referred By

No
Status
Activates or deactivates the supplier (default: active)
No

Supplier Detail Page
This page allows administrators to manage supplier details. Administrators can perform the following actions:
• Add Contact
• Add Notes
Multiple contacts can be assigned to a supplier.
The Events tab displays all events associated with the supplier.
Notes are visible to all users with access to the supplier record.

Settings
This menu serves as the portal’s main configuration panel.
User Access
This module displays access levels and their associated permissions.

Users
The module displays all portal users. Administrators can view, edit, delete, and log in as other users.

Regions
The module displays regions with their assigned managers for each event type in this module.
When an event is assigned to an educator, or when an educator approves or declines an assignment, the system automatically sends an email notification to the corresponding region or territory manager.
Additionally, regional/territory managers are responsible for reviewing and approving evaluations submitted by educators.

Territories
The module displays territories and assigned managers for each event type.
When an event is assigned to an educator, or when an educator approves or declines an assignment, the system automatically sends an email notification to the corresponding region or territory manager.
Additionally, regional/territory managers are responsible for reviewing and approving evaluations submitted by educators.
A notification is sent to managers 15 minutes after an event has started if no 'check in' was made by the educator.

Knowledge Tags
This module displays an editable list of knowledge tags used in educator profiles.
Product Sizes
This module displays an editable list of product sizes available during evaluations.
Programs
This module displays programs used for billing purposes
Product Types
This module displays editable product types used when adding products. Each product type maps to a Parent Category.
Divisions
This module displays divisions used for billing purposes.
Hidden Events from Evaluations
This module displays event names hidden from the Evaluation module.
SMS Report
This module displays a log of SMS issues from the Twilio integration.
Account Email Report
The module monitors the delivery status of "Rating Notifications email" across all accounts. These settings identify accounts experiencing delivery failures, providing the total count of failed attempts and the precise timestamp of the most recent dispatch. Common failure triggers include:
• Invalid Email Format: Addresses that do not follow standard syntax.
• Missing Data: Accounts where the email field is null or empty.
• Delivery Rejection: External server rejections or bounces.
Quickbooks Logs
This module displays a log of QuickBooks sync activities for billing.
Export Promocodes
This button downloads a list of promo codes used for billing.
Notify App Update
This button sends a notification to all educators when a new mobile app version is available.
Quickbooks Config
This page displays authentication tokens used for the QuickBooks integration.
Mobile Settings
This settings establishes the minimum supported app version. It ensures all users transition to the latest build by requiring an update for anyone on an older iteration

Reports
Monthly Events
This monthly report provides a concise, standardized overview of all events created in the selected date range. The x-axis represents the time, while the y-axis shows the number of events created.
Premises-Based Events
This monthly report presents a visual summary of the events conducted during the current month. The report is displayed based on predefined premises, such as:
On Premise SLA, On Premises, Delivery, Off Premises, Cannabis, Engraver / Calligrapher, ON / Trade
Distributor-Based Events
This monthly report presents a visual summary of the events conducted during the current month. By default, the date filter is populated with the current month’s date range, and the Distributor filter defaults to the Distributor with the highest number of events in the current month. We can customize the filter as per our requirements.
Suppliers Based Events
This monthly report presents a visual summary of the events conducted during the current month. By default, the date filter is populated with the current month’s date range, and the Account filter defaults to the Account with the highest number of events in the current month. We can customize the filter as per our requirements.
Account-Based Events
This monthly report presents a visual summary of the events conducted during the current month. By default, the date filter is populated with the current month’s date range, and the Account filter defaults to the Account with the highest number of events in the current month. We can customize the filter as per our requirements.
Event Summary
The Event Summary Report is generated with a primary focus on events. This module helps summarize events by providing a single consolidated view of the selected reports within a specified date range. The conversion rate is not calculated if any report has not been submitted for review.
Product Inventory
The Product Inventory Report is generated with a primary focus on products. This module helps summarize events using the selected product by providing a single consolidated view of the selected reports within a specified date range. The conversion rate is not calculated if any report has not been submitted for review.
Event report
This report provides a consolidated report for the select events. Here, the report is downloaded to the user's local machine
Educator Ratings Report
This report provides a quick summary of the educator's rating.
Company sales report
The Company Sales Report provides a summary of the total sales conducted under the specified filter conditions

Mobile Application
MyHems Android App

The MyHems Android application is available on the Google Play Store
https://play.google.com/store/apps/details?id=com.myhems&hl=en_US

Required Permissions

Settings > Apps > Search for MyHems and enable access to Location, Camera, and Notifications.
MyHems iOS App

Since the app is still considered an Enterprise App that’s not available to the public, it’s not available on the public App Store.

    •	Navigate to the portal login page https://portal.myhems.com/login
    •	Click on the “Download on the App Store” button found below the user guide.
    •	User will be redirected to https://apps.apple.com/us/app/myhems/id1443703433

Required Permissions

Settings > Search MyHems and enable/ allow access for Location, Camera, and Notifications.

Login screen
The login screen displays the installed version to help with support.
A singleton login component is shared across all user personas (Educator, Admin, Distributor, Supplier). The following modules are globally accessible to all authenticated sessions:
• Dashboard
• Profile
• Events
• Evaluations
• Ratings

Profile
The profile icon on the top-left navigates the educator to their profile page.

The screen displays basic contact details, their rating, text messaging consent, and the availability module.

Availability Module
The educator can manage their availability from the app
• Available indicates the educator is available for the entire day.
• Not Available: Indicates the educator is unavailable.
• Partially Available: Indicates the educator is available for a portion of the day. Available time slots can be adjusted and updated through the portal.
Dashboard
The dashboard shows an overview of Today’s Events, Evaluations to Complete, and Events to accept.

Today’s Events
This section displays all events that are assigned for today.

An event Check-In button will appear 30 minutes before the start of an event.

The educator has to be at the account location to check in.

Evaluations to Complete
This section lists evaluations that need to be completed.

Events to Accept
This section displays a list of events that have been assigned to the educator - events must be ‘accepted’ to confirm.
Events
The Events screen displays a list of upcoming and past events assigned to the educator.
Clicking any event loads the Event detail page.

Evaluations
The evaluations screen displays all evaluations to complete and evaluations pending manager approval.

Once the manager approves an event, it will not appear in the app.

Evaluation Form

Field Name
Description
Required
Main
Displays core event information, including Event Name, Account Name, Date, and Time.

Upload Photos
Multiple photo types may apply depending on the event type.

Clock-in and Clock-out images are mandatory for all event types.

Supports up to 10 images.
Yes

# of Consumers Sampled

Accepts numeric values only.
Yes
Total Attendance During Tasting
Mandatory numeric field representing total attendance. The total value must equal 100 and is auto-calculated at the end of the section.
Yes
Featured Drink Price

No
Drink Menu

No
Back Bar

No
Male

Yes
Female

Yes
Non-Binary

Yes
Age Group (21–29)

Yes
Age Group (30–39)

Yes
Age Group (40–49)

Yes
Age Group (50+)

Yes
Caucasian

Yes
Hispanic

Yes
African American

Yes
Eastern European

Yes
Asian

Yes
Other
Percentage of attendees categorized as Other. Accepts numeric values only.
Yes

Notes:
• If a particular gender does not attend an event, it should still be populated as 0
• The sum of the male + female + non binary should not be less than or more than 100
• All ethnic groups are based on percentage values and should equal 100

Event Results
This section saves data about the products sampled at the event.
Missing products can be added using the ‘Add New Product’ function.
The details below are required when adding a new product:
Field Name
Description
Required
Brand

Yes
Size
If multiple sizes are required, the exact product must be added again using the Add New Product button and a different size selected.
Yes
Starting Inventory

No
Drinks Purchased

No
Ending Inventory

No
Price

Yes
Featured Price
Special promotional price for the product during the event.
No

Other Details
Field Name
Description
Required
Bar Spend

Yes
Consumer Education

Yes
Weather

Yes
Door Traffic

Yes
Event Feedback

No
Surveys
Specific events will require a survey to be submitted. The educator will answer specific questions related to the event.
Evaluation Actions
Save & Finish Later: Saves the evaluation progress without submitting it for review. Educators can return later to update or complete the evaluation. 
Submit for Approval: Saves the evaluation and submits it for manager review. Once submitted, the evaluation cannot be edited. If changes are required, a new evaluation must be created.
Ratings
This tab features an aggregate average rating at the top and event-specific performance data below. Inactive:

Event Workflow
This guide explains how to create events, assign educators, manage notifications, complete evaluations, and generate reports.

1. Creating an Event

You can create an event in either of the following ways:

Click Add Event from the Events menu, or

Import an event from Events → Draft Events.

2. Scheduling an Educator

Educators can be assigned to an event in two ways:

During event creation on the Create Event page, or

From the Events Listing page:

Select the Schedule Educators checkbox.

A green plus (+) icon appears in the Number of Educators column.

Click the plus icon to open a pop-up.

Search for and select the required educator.

3. Notifying the Educator

Once an educator is assigned:

Go to the Events Listing page.

Select the event.

Click Notify Educator.

The educator will receive:

An email notification

A mobile app notification

An SMS to the registered mobile number

4. Educator Response

The educator can accept or reject the event notification using the email or the mobile application

5. Viewing Upcoming Events

After the educator accepts the event, it appears in their Upcoming Events list.

6. Sending Kit Ready Notification

Managers can inform educators when the event kit is ready:

Select the event from the listing page.

Click the Kit Ready button.

7. Event Reminder Notification

The educator automatically receives an SMS reminder 30 minutes before the event starts.

8. Event Check-In

The educator must be physically present at the event location to check in.

Check-in is enabled only when the educator is at the event location.

9. Evaluation Submission

After completing the event, the educator submits the evaluation for manager review.

Once submitted:

The event is removed from the educator’s event list.

It appears under the Pending Manager Approval tab.

10. Manager Review & Approval

A regional manager can approve or deny the submitted evaluation.

Evaluation status is shown using color-coded icons:

Green – Approved

Yellow – Pending manager approval

Red – Evaluation not completed

11. Generating Event Summary Reports

To generate a combined report for multiple events:

Select the required events from the Events page.

Click Generate Report.

This creates an Event Summary Report.

12. Printing Evaluations

Use the Print Evaluation button to print completed evaluations.

Events Listing – Icon Reference

The following icons appear in the Events Listing table:

B (Billing)

Inactive: Not approved for billing

Green: Approved for billing

S (Samples)

Active: Sample products assigned

Inactive: Sample products not assigned

E (Supplier Entry)

Active: Event details added to the supplier site

Inactive: Not added to the supplier site

R (Reconciliation)

Active: Approved for reconciliation

Inactive: Not approved for reconciliation

Bag Icon (Kit Status)

Active: Kit ready notification sent

Inactive: Kit notification not sent

Dollar ($) Icon

Active: Approved for billing

Integrations

Google Maps
The system uses Google Maps Platform for map display and location validation.
• Maps JavaScript API: Used for rendering the map on the event detail webpage.
• Directions API / URLs: Provides a mechanism for users to seamlessly open native directions in the Google Maps application.
• Geolocation & Geofencing (SDKs): The mobile application uses location services to restrict the functionality of the Check-in and Check-out features, only enabling them when the user is within the predefined event boundary.

Steps to Integrate Google Maps

1. Create a Google Cloud Project
   • Go to Google Cloud Console
   • Create a new project
2. Enable Required APIs
   • Enable only what you need:
   • Maps SDK for Android
   • Maps SDK for iOS
   • Maps JavaScript API
   • Places API
   • Geocoding API
   • Directions API
3. Generate API Key
   • Go to APIs & Services → Credentials
   • Create an API Key and keep it safe

Twilio

MYHEMS utilizes Twilio’s cloud-based communication platform to bypass the need for physical telecom hardware.

The following are the text notifications sent out by twilio

Notification Type
Timestamp
Occurence
Invitation
Upon educator invitation (educator assignment)
Once
Pre-Event Reminder
30 minutes before the start
Once
Checkout Reminder
10 minutes after the end
Once
Evaluation Reminder
24 hr after the event is due
Recurring until "Submitted" status
Kit ready
Immediately
Once
Event cancellation
Immediately
Once

To connect Twilio with the app, follow the steps:

    •	Sign Up for Twilio
    •	Go to twilio.com
    •	Click Sign up
    •	Create an account using email, Google, or GitHub
    •	Verify your email address
    •	Verify Phone Number
    •	Enter your mobile number
    •	Twilio sends an OTP
    •	Verify to activate the account.
    •	 Access Twilio Console
    •	After login, you’ll land on the Twilio Console
    •	This is the main dashboard to manage services
    •	Get Account Credentials
    •	In the Console:
    •	Go to Account → General Settings
    •	Copy the following details safely
    •	Account SID
    •	Auth Token (keep secret)
    •	Get a Twilio Phone Number
    •	Go to Phone Numbers → Buy a number
    •	Choose country & capabilities (SMS/Voice/WhatsApp)
    •	Purchase the number

Quickbook
QuickBooks integration connects MYHEMS with QuickBooks to automatically sync accounting data. In short, it helps eliminate manual entry and keeps finances accurate and up to date.
Steps to create QuickBooks App:
• Go to Intuit Developer Dashboard
• Create an app → QuickBooks Online
• Note the following:
• Client ID
• Client Secret
• Set Redirect URI to https://yourapp.com/quickbooks/callback

################################################################################
################################################################################

##

## SECTIONS 2 & 3: TECHNICAL OUTLINES & PROCESS DOCUMENTS (docx)

##

################################################################################
################################################################################

================================================================================
FILE: Current HEMs Application - Process- Examples/HEMS Questionnaire - Supplier Event Questions/CAMPARI - Picklist Questionaire - Lisa completed.docx
================================================================================
CAMPARI (Supplier) On - Picklist

After sampling did consumer perception change? Explain.

Yes,
No,
Did event reach Drinks Sold goal? If not, why? If event exceeded goal, please explain what worked well
If yes:
• So light and refreshing they wanted another.
• People ordered more shots.
• Attendees who sampled purchased another.
• Lively atmosphere helped boost sales.
• Knowledgeable and enthusiastic staff.
• Effective timing of the promotion.
• Having POS materials available helped.
If no:
• Slower traffic.
• Servers or bartenders did not promote the featured drink.
• Slow day due to off-season, weather, or competing events.

# of Consumers Sampled

    •	NUM#

ON PREMISE did you sell any drinks?
• Yes / No

Was this account a good fit for the program/would you recommend running additional promotions here?

    •	Customers were eager to sample
    •	Customers ordered additional rounds
    •	Customers enjoyed the experience.
    •	Customers showed curiosity about the product and actively engaged with sampling.
    •	The staff were knowledgeable about the product and supported sales efforts.
    •	The demographic matched the brand’s target audience well.
    •	Customers expressed interest in learning more about the brand and its offerings.
    •	 The location had excellent foot traffic, contributing to higher engagement.

Please provide any positive callouts:
• Loved the POS materials.
• High visibility drove interest.
• Enthusiastic and knowledgeable bartenders/servers.
• Venue was fun and busy.
• Patrons were engaging
•

Please provide any opportunities or challenges

    •	Great venue with a fitting age group.
    •	Need promotional materials.
    •	Not busy
    •	Busy venue
    •	Customers mentioned sampling was too early in the day.
    •	Small venue and was able to talk with everyone.
    •	Large venue and could not talk with everyone.

What was the main question asked by consumers during sampling?
• What does it taste like?
• Where is the product from?
• Is it new?
• Is it on sale?
• Does it come in smaller bottles?
• How much alcohol is in it?
• What cocktails can you make?

Consumer feedback and quotes:

    •	“This is so fun! I love that you’re here!”
    •	“This is so smooth!”
    •	“Can I have the recipe?”
    •	“This is a great cocktail!”
    •	“I love the hats, shirts, giveaways.”

What was cocktail made/served?

\*Include all cocktails for all brands for Campari Brands
\*\*Other for Manual fill in

Cost of cocktail?
• $

# of Giveaways Distributed

CAMPARI Off

After sampling did consumer perception change? Explain.
• Yes, perception improved significantly.
• Yes, they loved the price.
• Yes, it converted skeptics.
• Neutral, varied by individual.
• No, they already knew and purchased before.

Did event reach Bottles sold goal? If not, why? If event exceeded goal, please explain what worked well
• The best selling points were how smooth it was for a tequila is what most said others was the taste of the of the product
• Yes, the store had promoted the tasting
• Yes, the location was ideal for this product
• Yes, consumers who sampled were more inclined to purchase
• No, today this account wasn’t as busy as it could have been
• Having samples and to go bags.
• No. Customers had never heard of the product but in large part enjoyed the samples.
• Yes, Explaining the process, distinctive differences and location increased customer interest.
•

What was the predominant occasion consumers were shopping for?

Birthday Gift
Sport event
Party Friends getting together
Halloween
Holiday
Thanksgiving
Home Collector
Home Bar
Favorite Drink
Easter
Date Night
Valentine’s
Beach
BBQ
Family Gathering

Was this account a good fit for the program/would you recommend running additional promotions here?

    •	Yes Account as a good fit for the program with the right attendees and right crowd focus.
    •	Yes Account has a good fit with the right cocktail type focus.
    •	Yes staff are big supporters of our brands.
    •	Yes This is a great location for this product.
    •	Yes, good pricing
    •	Account has a very loyal customer base that is very open to recommendations.


    •	No, Account displays other types of drinks like beer
    •	No, Account has poor management focused on displaying seasonal items instead of drink brands.
    •	No account is focused on store brands only.
    •	No, customers commented price is too high

Please provide any positive callouts:
• Sale price encouraged purchases.
• Staff actively encouraged sampling.
• Customers were surprised by how much they liked the product after tasting.
• While some already knew and loved the brand, a number of customers were sampling for the first time.
• Rebate helped in sales

Please provide any opportunities or challenges
• Not interested in sampling today
• Slower day for this location
• Rebate would help in sales
• Staff was helpful
• Low stock
• Would have another event here but at a different time.
• One challenge was the price point.
• some customers mentioned it was a little early for them to sample
• Most customers were purchasing wines and champagne.

What was the main question asked by consumers during sampling?

    •	Where’s the product from?
    •	Is it new?
    •	Is this on sale?
    •	Does it come in smaller bottles?
    •	How much alcohol is in this product?
    •	What cocktails can you make?

Consumer feedback and quotes:
• "This is so fun! I love that you’re here!"
• "This is so smooth!"
• "Can I have the recipe?"
• "This is a great cocktail!"
• "I love the hats, shirts, and giveaways!"
• "This reminds me of being on vacation."
• "I was coming in for something else, but you just changed my mind."
• "The sweet taste of the cocktail is amazing!"
• "This is so different from what I usually drink; I’m impressed."
• several customers asked me for the recipe and took photos of the brand or mixers used
• Wow, that’s better than I thought it would be! 
• “Good Price”

================================================================================
FILE: Current HEMs Application - Process- Examples/HEMS Questionnaire - Supplier Event Questions/SOHO off-on premise Event Questions.docx
================================================================================
Event Report Form – Please fill out these additional questions and upload them to Hems.

    •	After sampling did consumer perception change?  Explain.
    •	Did event reach Bottles sold goal ( #bottles sold/# of consumers sampled)?   If not why?   ON PREMISE did you sell any drinks?
    •	How was the product sampled?
    •	What selling points worked best for consumers?
    •	Off premise - What was the predominant occasion consumers were shopping for?
    •	Was this account a good fit for the program/would you recommend running additional promotions here?  Explain
    •	Please provide any positive callouts:
    •	Please provide any opportunities or challenges
    •	What was the main question asked by consumers during sampling?
    •	Consumer feedback and quotes:

On Premise additional questions:
• What was cocktail made/served?
• Cost of cocktail
• # of giveaways distributed
Event Photos- Need 15 photos
• Product on shelf
• Promo Staff
• Sampling Setup
• Consumers enjoying samples.

================================================================================
FILE: Current HEMs Application - Process- Examples/HEMS Questionnaire - Supplier Event Questions/Questionnaire HEMS Enhancements Requirements-Acceptance Doc.docx
================================================================================
HEMs App Enhancements - “Questionnaire HEMs Enhancement”

Reference Questionnaire Table for questions, structure, and answer selections.

Overview: 

HART Clients require questions specific to the Supplier/Brand and have these questions added into a 3rd Party Marketing App (Pinata, SOHO, etc.). While work is in process to create API connections to transfer HEMs Data via the Crossbox to these 3rd Party solutions there are additional questions which if added into HEMs will reduce the number of manual hours to input after the events are completed. At times this information is being inputted today into the comments box and therefore a more formal data capture would be more efficient.

The enhancement looks to create a new capability in HEMs APP which will allow the Event to include a Questionnaire which is specific to a brand and required to be completed as part of the event in the app.

Questionnaire is the name for the assigned grouping of questions which the educator completes.
Questions are the pars of the questionnaire which are required to be completed.

Objectives:

    •	Add Data Table for Questionnaires and Questions to be handled for the HEM App
    •	Add Questionnaires into Event for Users setting up Events to have visibility
    •	Add Questionnaires into Events with Picklists for the Educators to fill out for each Event applicable.
    •	Add Questionnaire to Educator’s Event assignments
    •	Allow Event Managers to add/New Questionnaires
    •	Require filling out Questionnaires by assigned Educators with events associated with Questionnaires.

Considerations:
• Questions in the questionnaire will be standardized, however, may change if the client adds new required questions or changes questions.
• Questionnaire will change every marketing period (6 or 12 months)
• Consideration for an API Pull from SOHO
• Consideration to include the Pinata Event Naming and IDs Pull as part of this enhancement
• Answers by Educators are subjective, in order to ensure these answers are acceptable the answers listed should cover the majority of range.
• Questionnaires are depended on Premise of the event, (On Prem and Off Prem will have different questions)
• Client (Supplier)/Brand/Questionnaire will need to be handled.
• \*Consider Multiple Questionnaires on one Event. (IE HART Questionnaire and CAMPRI)

Dependencies:
• It’s understood that these answers are still depended on the educator
• Data pulls are NOT a dependency
•

Acceptance Criteria:

This project is accepted when:

    •	User/Manager Event Level can input/upload/add all the questions for a Questionnaire and assign to a brand.  (Upload file, manual input, etc)
    •	HEMs APP to creates a Unique Questionnaire ID (Brand/Questionnaire)
    •	Creation of HEMs APP Questionnaire Data and Questions for (IE table) which contains a brand’s specific to be assigned to events
    •	HEMs App Adds Questionnaire to the event assigned automatically the selection of the Brand with a Questionnaire.
    •	HEMs App includes Questionnaire into the Event creation, visible on the page
    •	HEMs includes a toggle on/off to include Questionnaire which is assigned via brand.
    •	HEMs App includes Questionnaire into the Event when App is accessed by the Educator to fillout
    •	HEMs App Assigns the Questionnaire to the Assigned Educator for the events associated with the brand
    •	Educators using HEMs App and is able to Answer Questions in Questionnaire with preloaded answers for pick list selections for each question where applicable and a single selection will be provided by the educator to select from if it’s text.
    •	Educators and Event Users can access Questions with additional information clarifying the question for the Educator (IE Pop up text or Information button with addition information provided in the Questionnaire data)
    •	Assigned Educator is required to complete all questions in Questionnaire before submitting the Event.  If HEMs allow for saving before submitting event information, a Questionnaire should be included as the saved portion.
    •	HEMs APP Captured Questionnaire results and push to Crossbox as data with the event ID, Educator ID, Brand, Questionnaire ID, Premise Type)

 
User Flow Outlines:

Event Manager User

Hems App Questionnaire Setup by Event Manager (IE Leah)
• User Creates a New Questionnaire
• User Assigned Brand, Premise Type
• User inputs questions with Picklist answers
• Questionnaire is added into HEMs App Data where the user is able to see the Questionnaire where applied

HEMs App Event Creation / View
• User Creates Event
• HEMs adds Questionnaire with the correlating brand
• Questions populate on Event
• User Save/Executes Event

User: Educator

HEMs APP at Event
• User opens app and starts event
• User is presented with Questionnaires
• User completes all questions
• User Saves/Submits event

HEMs App
• Saves Event Responses with Questionnaire responses
• HEMs Pushes Data to Crossbox

Crossbox
• Receives daily refresh of HEMs Data
• Populates Event Data with Questionnaires Data Report

 

 

 

================================================================================
FILE: Current HEMs Application - Process- Examples/HEMs Manager Process Flows Outlines/Manager HEMs Process Capture Jan 20 (Katie).docx
================================================================================
Technical Process Flow for Katie's Use of HEMs Application
 Katie – Hart Manager
In the process of an Event the

HEMs serves as the central tool for her territorial management, enabling visibility, assignment, tracking, and submission processes. It's accessed via a web portal for managers like Katie (she doesn't use the mobile app personally, as that's for educators). The process is territorial and event-driven, with Katie handling everything post-booking except initial business acquisition. Events are typically planned 7-10 days in advance, though last-minute changes occur. Budgeting and external tasks (e.g., printing permits or handling engraving machines) are informed by HEMs data but executed outside.
I've structured this as a step-by-step outline, grouping into phases for clarity: Preparation (Receiving and Assigning Events), Provisioning (Samples and Kits), Training and Execution, Post-Event Review and Approval, and Financial Closure (Expenses and Payroll). Each step includes how HEMs is used technically (e.g., tabs, buttons, features), assumptions based on the transcript, and any dependencies or pain points noted inline for context.
• Preparation: Receiving and Assigning Events

    •	Step 1.1: Access and View Upcoming Events

Katie logs into the HEMs web portal (using her credentials; she's always auto-logged in). She navigates to the events section or schedule view to see events input by Kim. Events include details like product lists, SKU numbers, notes (e.g., special instructions, swag requirements), and the full booking email attached. This provides all necessary info for planning. She focuses on a 2-week to monthly window (e.g., planning February events in January), aiming for 7-10 days lead time to avoid firefighting.
• HEMs Feature: Event list/view with attached bookings and notes.

    •	Dependency: Events must be pre-input by Kim; Katie doesn't add events herself.

    •	Step 1.2: Check Educator Availability

Using the "availability tab" in HEMs, Katie reviews which educators are available for the event dates/times. This eliminates guessing and ensures staffing feasibility.
• HEMs Feature: Availability tab (shows who can/can't work specific slots).

    •	Note: Educators are part-time; hiring is handled by managers like Katie, but this occurs outside HEMs (e.g., via interviews).
    •	Step 1.3: Assign Educators to Events

Katie assigns available educators to events directly in HEMs. Assignments trigger educator access to event details via their app or web login (using personal emails).
• HEMs Feature: Assignment interface in event details.

    •	Dependency: 7-10 day window allows time for assignments; last-minute events require quick adjustments.
    •	Provisioning: Ordering Samples and Preparing Kits

    •	Step 2.1: Order Products/Samples

From the event details, Katie copies SKU numbers and product lists to order samples externally (e.g., from depots like Southern, ordered on Thursdays for next-week pickup). HEMs provides all ordering info but doesn't handle the actual purchase-it's a reference tool.
• HEMs Feature: Product list with SKUs and notes.

    •	Note: Budgeting is informed by the attached booking (e.g., order extra for large events), but actual ordering/tracking is external.
    •	Step 2.2: Mark Samples as Ordered

Once ordered, Katie clicks the "S" button (samples ordered) in the event schedule/view. This updates status icons visible to the team (e.g., turns green for tracking).
• HEMs Feature: Status buttons (S for samples).

    •	Dependency: Depot availability; out-of-stock issues are noted later.

    •	Step 2.3: Prepare and Track Kits

Katie assembles kits physically (including samples, swag, uniforms, or special items like engraving machines, housed at her unit). In HEMs, she uses the "K" button under the kit bag icon to mark items as in stock/out of stock. This tracks inventory for multiple events and allows circling back to suppliers for shortages.
• HEMs Feature: Kit status buttons (K for stock tracking); icons show kit readiness.

    •	Note: External elements (e.g., flower shops, dipping programs) are noted in HEMs but assembled offline.
    •	Step 2.4: Notify Educator of Kit Readiness

Katie clicks the "K" button next to the educator's name, which sends a notification (text/email, based on educator preferences) that the kit is ready for pickup.
• HEMs Feature: Notification button (K); integrated messaging for educators.

    •	Dependency: Educators must have HEMs app/web access; notifications keep everything within HEMs (avoids personal phones).

    •	Training and Execution
    •	Step 3.1: Ensure Training Resources

Katie verifies/adds product facts, brand knowledge, or cocktail recipes to products in HEMs (if not already attached by Kim or suppliers). Educators access this by clicking products in their assigned event via the app/web. For new/high-end products, she emphasizes reviewing these, plus external research (e.g., brand websites). Broader trainings (e.g., Zoom/in-person on bourbons, wines) are organized outside HEMs but recorded; access to recordings is requested but not currently integrated.
• HEMs Feature: Product attachments (brand facts, notes).

    •	Note: Training is part-time focused; mandatory for specific programs if assigned. Hot brands (e.g., Tito's) require less prep due to repetition. 7-10 day lead allows review time.
    •	Step 3.2: Oversee Event Execution

Educators execute the event (consumer interactions, tastings). Katie doesn't directly use HEMs here but monitors via availability and messaging features if needed.
Educators check in/out via the app, upload photos, and start recaps.

    •	HEMs Feature: Educator app for check-in, photos (now supports multiple uploads); messaging for manager-educator communication.
    •	Dependency: App reliability; educators use personal emails for login.

    •	Post-Event Review and Approval

    •	Step 4.1: Review Recaps

Post-event, Katie accesses recaps in HEMs web portal: reviews sales data, comments, pictures, and supplier-sent info.
• HEMs Feature: Recap approval interface.

    •	Note: For cancelled events, educators still complete recaps (with notes like "cancelled upon arrival"), even if no sales/photos.
    •	Step 4.2: Approve and Submit Recaps

Katie approves recaps, ensuring completeness before submission to suppliers.

    •	HEMs Feature: Approval button; submission to suppliers.

    •	Dependency: App must save data reliably during educator input.

    •	Financial Closure: Expenses and Payroll
    •	Step 5.1: Enter Expenses (Bar Spends)

Katie enters bar spend totals in HEMs as required by Larry.

    •	HEMs Feature: Expense entry fields (e.g., $ sign button for billing approval).

    •	Note: Other buttons like E (enter into supplier's site) and R (recap?) are unused/unclear.
    •	Step 5.2: Handle Payroll

Per market, Katie approves educator payroll in HEMs, including adjustments for travel, missing pay, or cancellations (e.g., partial comp for day-of cancellations). She submits approved payroll to Larry.
• HEMs Feature: Payroll approval interface.

    •	Dependency: Cancellations require manual edits (e.g., change pay rate); no dedicated cancel button.
    •	Step 5.3: Submit to Central Team

All approvals (recaps, expenses, payroll) are submitted via HEMs to Larry/Leah for final processing.
• HEMs Feature: Submission workflow.

This flow is efficient for daily use but relies on manual checks for completeness (e.g., product facts). Unused features (e.g., E/R buttons) suggest potential underutilization or outdated elements.

Summary of Areas Needing Enhancement
Based on a deep review of the transcript, I've summarized key enhancement areas, prioritizing process gaps, technical issues, and user feedback. These focus on improving efficiency, reducing manual workarounds, and enhancing reliability. I've categorized them, estimated impact (high/medium/low based on frequency and multi-user involvement), and suggested technical considerations for implementation. The cancelled events handling is a standout pain point, as it affects multiple stakeholders (educators, managers, billing team) and disrupts the flow.
• Cancelled Events Handling (High Impact)
• Description: No dedicated process for day-of cancellations (e.g., retailer refuses event upon educator arrival). Currently, educators complete full recaps (check-in/out, photos, sales/notes) as if the event occurred, managers email Kim to edit bookings/pay, and manual adjustments are made. This involves 3+ people, redundant steps, and risks incomplete reports to suppliers.
• Enhancements Needed: Add a "Cancel" button in the manager's web portal (post-notification from educator/store). This should: auto-adjust pay (to partial comp), notify Kim for billing changes, stop app recap prompts for educators, auto-populate notes (e.g., "Cancelled upon arrival"), and flag for supplier reports. Managers prefer control (e.g., approve cancellations before educator access), not educator-initiated.
• Rationale: Happens frequently (double-books, slow days); streamlines multi-step communication/email chains.
• Technical Considerations: Integrate with existing status buttons (S/K); add backend logic for pay/billing triggers; ensure audit trail for trust (e.g., manager approval required).
• App Reliability and Data Saving (High Impact)

    •	Description: Educators experience random logouts during recap entry, losing unsaved data (sales, comments, photos, surveys). Requires re-entry 2-3 times; not tied to service issues but possibly memory/app design.
    •	Enhancements Needed: Implement auto-save (e.g., real-time or periodic) during recap input; add session persistence to prevent logouts; feedback loop for bug reporting (in-app button, not just email Heron).
    •	Rationale: Affects post-event closure; frustrates educators and delays approvals.

    •	Technical Considerations: Use client-side storage (e.g., localStorage) for drafts; monitor logs for logout triggers; integrate with app updates.
    •	Training Resources and Integration (Medium Impact)
    •	Description: Product facts aren't always attached (e.g., rushed new products); recorded trainings (e.g., Zoom on bourbons) exist but aren't accessible in HEMs. No formalized flow for new educators or mandatory sessions.
    •	Enhancements Needed: Mandate/automate product fact attachments during event input; integrate a training module in HEMs (e.g., upload/access recordings per product/event); add educator dashboard for required trainings (tracked completion).
    •	Rationale: Part-time educators need quick, centralized access; 7-10 day lead is short for unfamiliar brands.
    •	Technical Considerations: Expand product attachment fields; add video embedding; use notifications for mandatory trainings.
    •	App Updates and Communication (Medium Impact)

    •	Description: No direct notifications for app updates; managers rely on Leah's emails, but educators (especially iPhone users) forget to update, causing glitches. Android auto-updates, but user settings can override.
    •	Enhancements Needed: ln-app banners/notifications for updates; manager dashboard to check educator app versions; force updates for critical fixes.
    •	Rationale: Outdated versions exacerbate issues like single-photo uploads (now fixed for multiples).
    •	Technical Considerations: Leverage app store APls for version checks; add admin broadcast messaging.
    •	User Guide and Documentation (Low Impact)
    •	Description: Public user guide is outdated (e.g., old app install instructions) and exposed before login; managers unaware of all features (e.g., unused E/R buttons).
    •	Enhancements Needed: Make guide login-protected; update regularly (e.g., reflect multi-photo uploads); add in-app tooltips for buttons/features.
    •	Rationale: Potential underutilization of HEMs (e.g., managers suspect untapped capabilities).
    •	Technical Considerations: Host behind auth; version control for docs.

    •	General LIi/Process Tweaks (Low Impact)
    •	Description: Minor requests like adding notes/buttons for organization; clarify unused icons (E/R); ensure all products have facts (cleanup backlog).
    •	Enhancements Needed: User flow audit (e.g., future meeting mentioned); add customizable buttons/notes; bulk cleanup tools for product data.
    •	Rationale: Enhances daily usability without overhauling core flow.

    •	Technical Considerations: Prioritize in roadmap; user testing with managers.

Overall, HEMs captures 80-90% of Katie's needs effectively, but enhancements should prioritize high-impact areas like cancellations and app stability to reduce manual work and errors. This would support scaling (as alluded to by Larry's mentions of expansions). Next steps: Validate with other managers (e.g., Carolyn), prioritize in a roadmap, and prototype high-impact fixes (e.g., cancel button). Let me know if you'd like diagrams, user stories, or deeper dives!

================================================================================
FILE: 1 Technical Outlines/HART Affiliate Reference Requirements/HART Portal Pilot (Affilate Build) - Outline.docx
================================================================================
HART Platform – Affiliate Program Pilot H1 Technical Outline
12/15/2025

HEMs Master Documentation -

Overview: 

Hart has a Event Marketing business which services beverage companies by executing marketing, sampling, and event execution on behalf beverage clients.

HART is in the process of expanding HEMs our Event management app to other event marketing companies. To do this we need to create platform to which other event companies can access their environment.

Objectives:  
Develop and deploy a new web platform for affiliate marketing companies to access HEMs application which allows them to manage their educators. This includes setting up Portal access, multiple client security management, payment processing, and a clone environment of the HEMs app.

Hart needs a fast to market, low build MVP which mirrors HEMs for other Marketing companies with a real-world pilot, determine the business case, and finally decide if to invest more development or pivot.

Goals:
• Provide a secured B2B Portal access for a multiple Pilot Clients which links/access a clone copy of the HEMs Application and connects to a separate Mobile App.

    •	Affiliate HEMs Mobile (IOS / Android) apps or connect

    •	With our Pilot Client determine what are the HEMs valuable capabilities are, the needs of Event Companies for Hart to provide, and determine the business case for continued development of the Hart Affiliate Program.  This is supported by usage and client feedback reporting to the HART Team

    •	Affiliate environment also creates data from the events executing provides a copy to the Crossbox database for advanced insights, predictive analytics, and expands the future data profiling to other markets which the affiliates are in.

Considerations:
• This release must be MVP and must be business viable.
• HEMs Mobile App may not need to be cloned but current apps used for Educators and connect the data flow to the Affiliate Program
• HEMs App is already a Java based Webapp in market.
• Data needs to feed the application and be stored in another database
• Current AWS can be used for another Database for the Affiliate Copy however costs need to look at if this is the best way to handle data storage.
• Hart Main website should be updated with a link to this new Portal.
• Security needs to be considered on how to handle multiple Event Companies
• Future Mobile App structure needs to considered and current code may need to can
• API Integrations: Enable clients to connect their business intelligence systems directly to Heart's data
• Master data in the works from 3rd parties for Items and Accounts

Dependencies:
• Must use the current HEMs App Build
• New Account Master and Item Master for the new markets are required before release.
• Current data loads are manual, bulk/api Master data will be required.
•

Acceptance Criteria
This project is accepted when:

    •	Clients can create their own access and log into the new Hart Portal: Web-based platform where clients can log in to view/manage their event business, data, photos, and reports.
    •	Client is able to access the Affiliate HEMs App Environment, and all HEMs functions are available and working.
    •	Affiliate HEMs Web App connects to HEMs Affiliate Mobile and Educators can execute events providing results to the Web App and Crossbox.
    •	Automated Reporting: Generate insights on consumer profiles, sales lift, event ROI, and market intelligence.
    •	Provide a full training program for pilot clients to be trained.
    •	Client has a FAQ, access documents, and have a way for any issues to contact Hart Team.
    •	API Integrations: Enable clients to connect their business intelligence systems directly to Heart's data.
    •	API Integrations: event execution connects to Crossbox Analytics tables.
    •	Crossbox has tables setup to create analytics on additional event data
    •	Electronic Invoicing: Automate billing processes with API-based invoice delivery to client finance systems.
    •	Hart Team can determine Usage via reporting, educators, events, web app usage, and other metrics.
    •	Migration Planning: Begin transitioning more clients from old system to new platform.
    •	During Pilot provide a Phase 2 Technical recommendations on how to improve the current code, app flow, data storage, and any technical enhancements for a Phase 2.

================================================================================
FILE: 1 Technical Outlines/yourHART Additional HEMs Outlines - Enhancements/yourHART Enhancement - Manager Event Cancelation Process (Mobile App - HEMS).docx
================================================================================
“YOUR HART” Manager Enhancement – Cancelled Event Technical Outline
2/24/2025

Overview: 

Cancelled events are currently managed in the HEMs application, based on the described workflow. It focuses on scenarios where an educator arrives at the retailer, but the event is refused (e.g., not on the calendar, slow day, or other retailer decisions). Note that this differs from pre-event cancellations (e.g., educator cancelling in advance), which may follow a simpler adjustment path. The process involves manual communication, edits, and workarounds due to the lack of a dedicated "cancel" feature. Events are not fully removed from HEMs or the educator's app; instead, they are edited and processed as incomplete with explanatory notes. Heart compensates educators partially for time and travel, and billing to suppliers is adjusted accordingly.

The flow is divided into phases: Notification and Approval, Reporting and Edits, App and Recap Handling, and Review and Submission. Each step includes roles, actions, HEMs involvement (or lack thereof), and any noted pain points.

The Process is between the Educator (in field) using the Mobile App, and the Manager which uses the Mobile App and Web Based HEMs.

Current HEMs Manager – Educator Event Cancellation Example:

1. Notification and Approval

Step 1.1: Educator Reports the Issue
The educator arrives at the event location and encounters the cancellation (e.g., retailer says "we don't want you today" or "you're not on my calendar"). The educator notifies Katie (the manager) directly via phone call, text message, or other personal communication (not through HEMs). This is the starting point, as educators do not have a direct cancel option in the app to maintain trust and verification.

Roles: Educator (reporter), Katie (approver).

HEMs Involvement: None at this stage; communication is external {personal phones/texts).

    Pain Point: Relies on manual, non-integrated notification; no in-app reporting for educators to flag issues without manager approval.

Step 1.2: Manager Verifies and Approves Cancellation
Katie verifies the details (e.g., speaks with the educator, store, or rep if needed) and approves the cancellation. She confirms partial compensation for the educator (e.g., for picking up the kit, driving, and time invested). This approval is informal and not tracked in HEMs at this point.
Roles: Katie (verifier/approver); potentially involves store/rep for confirmation.

    HEMs Application / Mobile App Involvement: None; verification is external.

    Pain Point: Katie prefers manager-only control to avoid unverified educator-initiated cancellations (e.g., false claims like "it was snowing").

2. HEMs Event Reporting and Edits

Step 2.1: Report Cancellation to Kim
Katie emails Kim (the event inputter/booker) to notify her of the cancellation. This email includes details like the event ID, reason, and request for billing adjustments (includes: partial billing to supplier, not full event cost and payment for partial time or full to the Educator for Travel even if the event was cancelled)

    Roles: Katie (reporter), Kim (receiver for billing).

    HEMs Involvement: None for notification; email is external.  Inputs are done by into HEMs Web Application by Manager and any billing is emailed for Office Operations.

    Pain Point: Manual email step slows the process and risks miscommunication; no automated notification or flag in HEMs.

    HEMs Application retained cancelled events even in Reporting (shows blanks without any reason for cancelation), Event shows executed and doesn’t have any proper tagging for Cancelation, justifiable reasons for cancellation are not added into Event / Campaign reviews for Supplier or distributor clients.

Step 2.2: Edit Event in HEMs

Katie (or Kim) goes into the HEMs web portal, accesses the event booking, and manually edits it to mark as cancelled. This includes changing the pay rate for the educator (to partial compensation) and updating any notes. The event is not removed from the overall list of events in HEMs; it remains visible but flagged/edited as cancelled for tracking and reporting purposes.

    Roles: Katie/Kim (editors).

    HEMs Involvement: Web portal event details/booking interface for manual edits (e.g., status fields, pay rate adjustments, notes).

    Pain Point: No dedicated "cancel" button in mobile app; requires navigating to the booking, manual edits, and separate pay changes. Event stays in the system, which can clutter views if not filtered.  Event cancelation reason is not capture in process.

3. App and Recap Handling

Step 3.1: Educator Continues App Process Despite Cancellation

The educator's mobile app does not update automatically to reflect the cancellation. It still treats the event as active: prompts for check-in (if not already done), check-out, and full recap completion (including photos, sales data, comments, and surveys). The educator must proceed as if the event occurred, but inputs zeros/blanks for sales/photos and adds notes explaining the cancellation (e.g., "Cancelled upon arrival due to retailer decision").

    Roles: Educator (Mobile app user).

    HEMs Involvement: Educator app (check-in/out, recap fields); no cancellation flag, so full workflow persists.

    Pain Point: App does not remove or hide the event from the educator's list; forces unnecessary steps, leading to redundant data entry and frustration. No auto-update to skip prompts or pre-fill notes/reason.

Step 3.2: Manager Reviews Educator's Recap

Katie accesses the recap in the HEMs web portal to review the educator's inputs (blanks/zeros for sales/photos, explanatory notes in comments). She ensures the reason is documented but cannot auto-flag or simplify due to lack of cancellation-specific fields.

    Roles: Katie (reviewer).

    HEMs Involvement: Web portal recap interface.

    Pain Point: Recap must still be completed fully, even for non-events; no mechanism to auto-populate reason or prevent blanks from showing in reports.

4. Review and Submission

Step 4.1: Approve and Submit Recap with Cancellation Details

Katie approves the recap in HEMs, including the blanks/zeros and notes explaining the reason (e.g., "Event cancelled upon arrival; partial comp provided"). This is submitted to suppliers, Larry, and/or the central team. The system does not prevent submission with blanks; notes serve as the communication for why the event was not completed.

    Roles: Katie (approver/submitter).

    HEMs Involvement: Approval and submission buttons in web portal.

    Pain Point: Suppliers receive "empty" reports (no sales/photos) with only notes for context; no structured field for cancellation reasons, risking misinterpretation. Campaign reviews (e.g., account-level summaries) show incomplete data without automated flagging.

Step 4.2: Final Financial and Campaign Closure

Kim adjusts billing based on the email/edit {partial charge to supplier). Katie submits adjusted payroll to Larry via HEMs. In broader campaign reviews (e.g., supplier reports or account overviews), the cancellation is noted manually in comments, but blanks/zeros may still appear without a way to mask or categorize them as "cancelled" vs. "failed."

    Roles: Kim (billing), Katie {payroll), Larry (final reviewer).

    HEMs Involvement: Payroll submission interface; report generation for campaigns.

    Pain Point: No integrated way to communicate reasons in reviews (relies on notes); blanks persist, potentially affecting perceptions of campaign success. Multiple stakeholders {3+ people) involved in redundant steps.

This current process is manual and inefficient, involving external communications
{phone/text/email) and workarounds in HEMs. It ensures accountability (e.g., manager approval) but creates extra work, such as forcing full recaps for non-events and manual edits. Events are edited rather than removed to maintain records for compensation and billing.

Objectives:

With the Opportunity to design a new HEMs (aka Platform) and Mobile app the objective to provide a way to account and process cancelled events from Educators. This Process is only for the day of the Event and at the point which the Educator arrives or attempts to arrive at the Event Location.

Goals:
• Allow for Educator to tag Event as Cancelled “With Manager Approval and
• Force direction communication with Manager to confirm via conversation (text, Phone Call, or chat Only) in order for the Manager to be made immediate aware of the situation.
• Manager needs formal approval process for the Canceled Event
• Data Consideration with Cancelled Event
• Reporting and Client shared Reports handling of Cancelled events
• Billing for Educator is process is in place
• Supplier / Client Billing for cancelled process

Considerations:
• Process is not correctly accounted for by HEMs Application
• Communication / Approvals are handled manually
• Finance

Dependencies:
• New Mobile App
• New HART Platform

Acceptance Criteria
This project is accepted when:

================================================================================
FILE: 1 Technical Outlines/yourHART Additional HEMs Outlines - Enhancements/yourHART Enhancement - Account Management.docx
================================================================================
“YOUR HART” Enhancement – Account Management Technical Outline
2/24/2025

Overview: 

HART leverages it’s own Master Data for Accounts. This master data is used for assigning Educators to Events for execution and need to communicate with Distributor Clients, Supplier Clients and Data provider clients. Communication with clients requires keys to align with their data.
 Future management of Account is needed to provide syndicated data on Accounts and need to be foundationally developed for Account Profiling, Event Insights, Event Reporting, Campaign reviews.

Currently in HEMs Application

Objectives:

Preparation for Foundation master data, API setup of ingestions of account data, and creating new data models.

Second is

Goals:
• Foundational Data and Database Tables
• Metrics
• Event Type Execution Scores
• Category
• Data Linkage preparation for Consumer profiling
• Geo Coding
• Address
• Handle Key Identifiers for Distributor, Supplier, Data Provider
• Handle VIP Master Account Data Setup
• Account Attributes
• Data Linkage to Menus, Displays, Executions
• Weights or value levels assigned to Metrics
• Performance Optimization – Educator Scores, Rankings, Manager – Educator Reporting
• Categories, Brands

Considerations:
• Metrics Tracking
• Process is not accounted for by HEMs Application
• Communication / Approvals are handled manually
• Manager’s Excel Sheet will need to be considered for Metrics
• Personal information of Educators will be handled
• Mobile App requires GPS and Time Tracking

Dependencies:
• New Mobile App
• New HART Platform

Acceptance Criteria
This project is accepted when:

Metrics
• Retail Sales Reported Average
• Preferred Brands
• Preferred Categories
• Check in Score
• Event Completed to End Time Average
• Retailer Survey Score
• Cancellation Rating
Data
• Educator’s Home Address
• Manager - Educator Notes
• Shows all the Accounts Executed at
• Allows for
• Training Completed for
• Current Active (booked in the past 3 months)
•

HEMs App Event Educator Assignment – Auto Suggestion for Managers
• Uses Address of Educator and Events to provide closest Educator
• Highlights Educators with Poor Cancellation Rate or Poor Score
• Considers / Highlights Preferred Category / Brand / Event Type with Educator
• Shows Average Sales Rate
• Shows Manager Notes
• Allows Manager to Select preferred Educator from Short list or access full list to pick from.

HEMs App Educator Management List
• Shows full list of Educators
• Sorts by Areas of Geography aligned by Nieghorhoods (Needs zip codes or reference Table)  
 • Sorts by Manager Geography
• Allows User to add / modify / remove infomation

================================================================================
FILE: 1 Technical Outlines/yourHART Additional HEMs Outlines - Enhancements/yourHART Enhancement - Educator Management System.docx
================================================================================
“YOUR HART” Enhancement – Educator Management Technical Outline
2/24/2025

Overview: 

Educators are the core to the success of HART executing events and are the people for are the true face of the company.

Currently over 1000 Educators are employed and are not managed, rated, or leveraged for their competencies. HART Managers rely on their personal knowledge as to who would work well for an email, the relationship, and a manual spreadsheet which captures recent notes of recent good or poor executions. This includes if the educator has been canceling events, doesn’t show, or is good with Gins, likes to work certain types of events, cannot work certain types of events.

Objectives:

With the Opportunity to design a new HEMs (aka Platform) and Mobile app the objective to provide a way to provide a Score, capture more information of the educator and automate the Event – Educator assignment by having HEMs auto populate good Educators for events based on geography, knowledge, preferences, and execution history.

Goals:
• Foundational Data and Database Tables
• Metrics to Track for Educators
• Weights or value levels assigned to Metrics
• Manager Metrics
• Performance Optimization – Educator Scores, Rankings, Manager – Educator Reporting
• Set Training Programs (Categories, Brands)
• Add Training Program to Mobile App for Educators
• HR styled Plan for Educator Retention and Engagement
• Linkage of Educator Performance Metrics to Platform Event / Educator Auto Assignment

Considerations:
• Metrics Tracking will need to be added into the Mobile App for Educators
• Process is not accounted for by HEMs Application
• Communication / Approvals are handled manually
• Manager’s Excel Sheet will need to be considered for Metrics
• Personal information of Educators will be handled
• Mobile App requires GPS and Time Tracking

Dependencies:
• New Mobile App
• New HART Platform

Acceptance Criteria
This project is accepted when:

Metrics
• Retail Sales Reported Average
• Preferred Brands
• Preferred Categories
• Check in Score
• Event Completed to End Time Average
• Retailer Survey Score
• Cancellation Rating
Data
• Educator’s Home Address
• Manager - Educator Notes
• Shows all the Accounts Executed at
• Allows for
• Training Completed for
• Current Active (booked in the past 3 months)
•

HEMs App Event Educator Assignment – Auto Suggestion for Managers
• Uses Address of Educator and Events to provide closest Educator
• Highlights Educators with Poor Cancellation Rate or Poor Score
• Considers / Highlights Preferred Category / Brand / Event Type with Educator
• Shows Average Sales Rate
• Shows Manager Notes
• Allows Manager to Select preferred Educator from Short list or access full list to pick from.

HEMs App Educator Management List
• Shows full list of Educators
• Sorts by Areas of Geography aligned by Nieghorhoods (Needs zip codes or reference Table)  
 • Sorts by Manager Geography
• Allows User to add / modify / remove infomation

================================================================================
FILE: HART Survey Tool (Ai)/HART Ai Survey App - Outline.docx
================================================================================
HART Ai Survey – Project Technical Outline
12/29/2025

HEMs Master Documentation - Hems x Master Documentation - 12-17-2025.docx
Survey Example Data - Hart Suvey PP Data.xlsx
Account Profile –
Survey Excel Reporting Output Example - Hart Summer 2024 Survey Project Data File v2.xlsx
Data Reporting Dashboard Examples
Survey Standard Template Excel

Overview: 

Hart has a Event Marketing business which services beverage companies by executing marketing, sampling, and event execution on behalf of beverage clients.

HART is in the process of expanding Event management app to a platform of solutions. To do this we need to create platform to which other event companies can access their environment.

This project is a needed enhancement to collect Account Level survey of alcohol beverages, pricing, shelve sets, display locations within the store.

Hart is currently providing surveys manually in retail accounts, bars, restaurants, clubs, and chain accounts.

Objectives:

Develop and deploy a fast to market, low build MVP of an Ai Image Supported App which Hart Users (Educators) can use to provide manual survey data via form and take a picture which the HART Ai identifies the brands, pricing, etc in the image to fill in the form and attach the image as meta data.

The objective is to leverage Ai for image recognition to quickly fill in the survey data at the account level fills in a form, allow the Hart Educator to confirm the form entries, change any errors, and then submit the results.

The Ai Objective is to accurately fill in the form from the image taken, learn from the changes, and in future get to the point where the Ai is near 100% accurate with understanding what it sees and reporting correctly back for a full market roll up.

The surveys conducted are around the following areas which vary depending on the three types of accounts:

Off Premise independent or Off Premise Chain
• Store Coldbox
• Store Displays (Any points of purchase NOT on shelve)
• Store Displays with Point of Sale items (POS with the display)
• Store End Caps
• Store Counter
• Store Window Displays
• Store Shelve Set (Bottle placement of surveyed brands and adjacent brands)

On Premise
• On-Premise Back Bar(s)
• On-Premise Food Menu
• On-Premise Cocktail/Drink Menu
• Other Free Text Question

Special Events
• Back Bar(s)
• Food Menu
• Cocktail/Drink Menu
• Other Free Text Question

The resulting data need to roll back and be reported in several different table with the result of creating formal profiles of data in addition to providing detailed plus summaried survey Results.

Goals:
• HART can gather Account Surveys
• Database Tables and Structure to capture Survey Data, report details, and provide profiling.
• Surveys are setup via Template
• Surveys UI leverages Image Ai Recognition and fills in the Survey form with data it sees.
• Have a MVP release which will be real world leveraged in February
• Build is flexible enough to be added into a future IOS / Android app of HEMs 2.0

Considerations:
• This release must be MVP and must be business viable.
• Crossbox Data will need new tables added.
• Crossbox Account / Product Keys need to added to the survey data for future reporting
• Crossbox Account / Product Master data must be used
• Need to determine how Educators are assigned Survey
•

Dependencies:
• Current Account Master and Item Master are required to be used.
• Current data loads are manual, bulk/api Master data will be required.
• Survey Accuracy is depended on the Educator.
• Survey Types are depended on Channel and templates correspond to the channel.
•

Acceptance Criteria
• Survey builder (create/edit/publish questions, question types, basic logic)
• Mobile-friendly survey experience (responsive web app)
• Results dashboard (summary view + export to CSV)
• Optional Database writeback integration (if needed)
• Admin roles/permissions

Deliverables:
• Ability for a user to take/upload a photo of a cold box or shelf set.
• AI vision pipeline to detect bottles, shelf tags, and SKU labels.
• OCR extraction of pricing from shelf tags.
• Matching pipeline that aligns detected items with your Master Item Universe (full U.S. beverage alcohol database).
• Automatic pre-population of survey fields (brand, SKU, price, facings, placement) for user confirmation.
• Seamless workflow inside the Survey Tool so field reps do not need to manually enter product data.
This turns the Survey Tool into an AI-assisted shelf audit system, dramatically reducing time spent collecting store-level execution data.

This project is accepted when:

    •	Survey builder:
    •	Create/edit/publish surveys.
    •	Core question types (single/multi-select, numeric, text, etc.).
    •	Mobile-friendly respondent experience:
    •	Responsive web UI that works well on phones/tablets.
    •	Results + exports:
    •	Basic dashboard and CSV export.
    •	Optional DB writeback to Crossbox (or another DB) if needed.
    •	Admin roles/permissions:
    •	Distinguish between admins vs. basic users for survey management.
    •	Photo capture fields:
    •	Allow users to attach shelf/cold-box photos to responses.
    •	Store metadata (location/time/survey context) in a structured way to support Phase 2 image-recognition work.
    •	ClearSet.AI will build a mobile-ready tool enabling:
    •	Leverage Image Recognition AI
    •	Create a Simple Form Style output of Image AI recognition data using the Crossbox
    •	Image AI learns to recognize Bottles and Labels

App Flow

If Channel is Off Premise or Off Premise Chain – Account Survey is:
• Channel Set to Off Premise
• Or Channel Set to Off Chain which tags the Chain as a group
• Supplier, Products Selected - uses picklist from Crossbox Master Tables
• Survey Template Setup (Displays, Shelve Sets, Pricing)
• Option to add a Custom Free Text Question
• Accounts Selected uses picklist from Crossbox Master Account Table
• Date of Survey Execution is assigned
• Survey is pushed to Queue for Execution
• Ai Learns new products listed, webcrawl www.sgproof.com
• Educator Starts survey at one account
• Educator selects location (End Cap, coldbox, floor display, counter, window, other)
• Educator take photo of location (End Cap, coldbox, floor display, counter, window, other)
• Ai determines what products are there, how many facing total, capture pricing\*
• Ai Fills in form
• Educator Accepts or changes with drop down to correct items, pricing, location.
• Educator Saves and continues Survey of store
• Educator repeats process for all Survey locations in account
• Educator completes and submits form data and images.
• Crossbox captures, updates tables and survey results.
• Results are summarized with details and hyperlinks to images
• Results are shared with Client via Summary Report, with account level detail, hyperlink to photo per account.

If Channel is On Premise – Account Survey is:
• Channel Set to On Premise
• Supplier, Products Selected - uses picklist from Crossbox Master Tables
• Survey Template Setup (Backbars, Menus, Pricing)
• Option to add a Custom Free Text Question
• Accounts Selected uses picklist from Crossbox Master Account Table
• Date of Survey Execution is assigned
• Survey is pushed to Queue for Execution
• Ai Learns new products listed, webcrawl www.sgproof.com
• Educator Starts survey at one account
• Educator selects location (Backbar, Food Menu, Cocktail Menu, Drink List, other)
• Educator take photo of location / item to be scanned (Backbar, Food Menu, Cocktail Menu, Drink List, other)
• Ai determines what products are there, how many facing total, capture pricing\*
• Ai Fills in form
• Educator Accepts or changes with drop down to correct items, pricing, location.
• Educator Saves and continues Survey of store
• Educator repeats process for all Survey locations in account
• Educator completes and submits form data and images.
• Crossbox captures, updates tables and survey results.
• Results are summarized with details and hyperlinks to images
• Results are shared with Client via Summary Report, with account level detail, hyperlink to photo per account.

If Channel is Special Event – Account Survey is:
• Channel Set to Special Event
• Supplier, Products Selected - uses picklist from Crossbox Master Tables
• Survey Template Setup (Backbars, Menus, Pricing)
• Option to add a Custom Free Text Question
• Accounts Selected uses picklist from Crossbox Master Account Table
• Date of Survey Execution is assigned
• Survey is pushed to Queue for Execution
• Ai Learns new products listed, webcrawl www.sgproof.com
• Educator Starts survey at one account
• Educator selects location (Backbar, Food Menu, Cocktail Menu, Drink List, other)
• Educator take photo of location / item to be scanned (Backbar, Food Menu, Cocktail Menu, Drink List, other)
• Ai determines what products are there, how many facing total, capture pricing\*
• Ai Fills in form
• Educator Accepts or changes with drop down to correct items, pricing, location.
• Educator Saves and continues Survey of store
• Educator repeats process for all Survey locations in account
• Educator completes and submits form data and images.
• Crossbox captures, updates tables and survey results.
• Results are summarized with details and hyperlinks to images
• Results are shared with Client via Summary Report, with account level detail, hyperlink to photo per account.

Data Requirements
• Must include Account Key
• Must include Product Key
• Must include date time stamp of submission
• All Time surveys must be retained
• Images will be saved and meta tagged with survey
• Account Display locations are recorded to Account Profile Table
• Hyperlink to images are required

    •

User Stories
Hart Client Manager
• As a back house office manager I need to supply surveys on the request of our clients to gather data on the current accounts our team visits and our clients have sales from their distributor with. To do they they contract Hart to go in market and gather back this data.
• I need to create Surveys for each Supplier client specific to what they are asking for in questions
• I need an Ongoing Survey which shows a what’s on display, on menus, on backbars in the accounts we service with a week’s noticed
• I need to have Market survey of displays and menu placed items rolled up within a week of notice from our Clients.
• I need to communicate what information I need to the educators to provide the correct and accurate market insights.
Educator
• As a field personnel I collect the data requested by the survey. It’s important that this doesn’t take too long and is easy for me to execute without making the retailer.
• I don’t have a lot of time and owners don’t like me conducting anything that doesn’t provide value to them.
• I need to collect the survey data quickly.
• I prefer to work on inputing information after taking photos so I am not in the store too long and creating too much attention to my actions.
• I need to use this script to conduct a Survey in each account Script to introduce the retailer to the survey.docx
•
Hart BI Analyst
• As a business intelligence analyst I need to create summary reports based on the data collected.
• I need accurate data to provide summaries back to our clients
• I need to provide excel spreadsheet and images to our clients
• Our clients can connect via API but I need to ensure the data shared is appropriate and accurate before sharing.

User Flow

================================================================================
FILE: Data/HART Data Profile Consumer - Outline.docx
================================================================================
HART Data “Consumer Profiles” – Project Technical Outline
12/30/2025

HEMs Master Documentation - Hems x Master Documentation - 12-17-2025.docx

Overview: 

Hart has a Event Marketing business which services beverage companies by executing marketing, sampling, and event execution on behalf of beverage clients.

HART is creating deeper insights and ongoing management of data collect by tools HART has and create profiling of the Consumers which HART directly interacts with at event

There is a need to create an ongoing live list of account profiling which is updated / confirmed with each visit by a HART Educator.

HART needs to collect more Consumer data which our educators interact with, profile this data to provider deeper insights on marketing. Along with providing a event insights the need is to create/capture attributes to Profile the Consumers at the events from educators, while finding ways to package our profile

with Social and finally package this information back to our clients.

Objectives:

Our clients are from the Commercial (Sales) Teams which traditionally HART provides simple recaps of number of samplings, general consumer interaction feedback, and breakdown of male/female. Our goal is to provide additional consumer data to be packaged back to the same client’s other departments (other budgets) which have other objectives outside how many consumers were sampled and what is the ROI of $ vs Sales at time of event.

Brand / Marketing Team, has a direct interest in understanding if the Targeted consumer is correct, was targeted, and provide feedback on the engagement. Along with doing this HART looks to provide deeper profiling via attributes who we interacted with, who was influenced but did not interactive with in the account, and provide deeper insights

Social / Internet Marketing / eCom Team, has direct interest in any collection of HART’s direct engagement which directs Consumers to fill out information directly agreeing for continued engagement digitally. Addtiionally

Standardize Profiling for Accounts which can be leveraged for the Current HEMs app.

Provide a standardized tables of data which “Profiles” the attributes which are collected by Educators via HEMs App and survey app.

With data collection formally structured we need to create linkage to maintain master data (Account Master), while connecting these account attributes to the data insights we are creating.

Future we will need to be prepared to create new reporting leveraging Accounts attributes into visuals, future recommendations, and Ai insights.

Goals:
• Consumer Data Profile including new Attributes
• Hipstr QR / Website Collection Consumer Data
• VC Solutions Geofencing of Consumer in area of Event
• Create Consumer Data Packaging for Social Team
• Create Consumer Data Packaging for Brand / Marketing Team
• Create Retargeting for eCom Sales Team
• Simple Consumer Profiling Attribute Reporting
• API Consumer Profile to S

Considerations:
• Crossbox Data will need new tables added.
• Crossbox Account / Product Keys need to added to the survey data for future reporting
• Crossbox Account / Product Master data must be used
• Need to determine how Educators are assigned Survey
• Considerations for API
• Consideration to management Master Account Data
• Connection to Current HEMs App
• Connection to Current HART Survey App

Dependencies:
• Current Account Master and Item Master (Brand Categories) are required to be used.
• Current data loads are manual, bulk/api Master data will be required.
• Accuracy depends on the Educator.
• Attribute Types / Sub Types are depended on Channel.

Acceptance Criteria
• Data Table(S) with all attributes
• Table View Linkage to Menu Data, Survey Data, Pictures
• Demonstration of Mapping / Reporting with attributes
• Account Master Linkage / direct view update with most recent updates
• Future preparation for Ai, Event Suggestions, and Exportability

Deliverables:

Consumer Data Collection Framework
Data Category
Specific Survey Collection - Data Points
Application (Marketing, Sales, Social)
Demographics
Age, ZIP code, household income, education, Address / Zip, Household type, House Hold Size
Sales: Pricing strategy & regional distribution.
Dietary Identity
"How would you describe your diet?" (e.g., Flexitarian, Keto, Vegan, No Restrictions).
Marketing: Messaging & ingredient highlighting.
Purchase Velocity
"How often do you purchase [Product Category] per month?" Should be for Social, Celebration/Special Occasions, Sporting events, Business
Sales: Inventory forecasting & subscription modeling.
Channel Preference
"Where do you most frequently buy your groceries/drinks?" (e.g., Big Box, Specialty, Online, Convenience). Or Type of Account IE Bar, White table cloth Restaruants
Sales: Retailer outreach & placement strategy.
Price Sensitivity
"At what price point would you consider this product too expensive to buy regularly?"
Marketing: Competitive positioning & discount strategy.
Consumption Occasion
"When do you typically consume this product?" (e.g., On-the-go, mid-afternoon slump, social gatherings).
Marketing: Ad creative & campaign timing.
Value Drivers
"Rank the following in order of importance: Taste, Price, Health, Sustainability, Convenience."
Marketing/Social: Core value proposition & content pillars.
Social Influence
"Which platforms do you use to discover new food/drink brands?" (TikTok, IG, Pinterest, YouTube).
Social: Budget allocation & platform-specific creative.
Brand Sentiment
"Which of the following brands have you purchased in the last 3 months?" (Competitive Set).
Marketing: Competitive analysis & "Switching" campaigns.
Engagement Type
"Would you attend a local tasting event or pop-up?"
Social: Event planning & community activations.

    User Stories

Hart Executive Sales
• Our clients ask us to provide deep information around the consumers who we interact with at events.
• Brands ask for ways we can provide more insights and the deeper discussion on our execution to help confirm assumptions as to Who is the key Brand Consumer and cross with Accounts and other data
• We have partners looking to benefit from more marketing insights we want to provide for their Brand Team to confirm assumptions, guide new strategies, and
Hart Client Manager
• As a back house office manager, I need to provide recommendations on the market as to which accounts my clients should target based on the type and attributes of the account
• I need to create help provide guidance to the right trade program support (IE Events).
• Clients ask for what accounts have certain attributes and as much as I know the market I cannot memorize every account in my market.
• Clients request deeper categorization on the what types of accounts are successful and what type of accounts are opportunities.
• I need to communicate what information I need to the educators to provide the correct and accurate market insights.
Educator
• As a field personnel I collect the data requested by the survey. It’s important that this doesn’t take too long and is easy for me to execute without making the retailer.
• I don’t have a lot of time and owners don’t like me conducting anything that doesn’t provide value to them.
• I need to ensure I am at the correct location an sometimes business change their names.
• I prefer to work on inputting information after taking photos so I am not in the store too long and creating too much attention to my actions.
• I need to use this script to conduct a Survey in each account Script to introduce the retailer to the survey.docx
•
Hart BI Analyst
• As a business intelligence analyst I need to create summary reports based on the data collected.
• I need accurate data to provide summaries back to our clients
• I need to provide excel spreadsheet and images to our clients
• Our clients can connect via API but I need to ensure the data shared is appropriate and accurate before sharing.
• Need to provide deeper analytical reviews on our Events, Surveys, and business results to our clients. I can do this with more attributes to filer, sort, and provide sub summarizes on.
• Need to talk deeper as to what the data stores are and it’s best to use categorizations to show where the wins and losses are.

================================================================================
FILE: Data/HART Data Profile Accounts - Outline.docx
================================================================================
HART Data “Account Profiles” – Project Technical Outline
12/30/2025

HEMs Master Documentation - Hems x Master Documentation - 12-17-2025.docx
Survey Example Data - \*\*\*\*Hart Suvey PP Data Example Exploded Data - All Results.xlsx
Survey Excel Reporting Output Example - Hart Summer 2024 Survey Project Data File v2.xlsx
Data Reporting Dashboard Examples
Survey Standard Template Excel

Overview: 

Hart has a Event Marketing business which services beverage companies by executing marketing, sampling, and event execution on behalf of beverage clients.

HART is creating deeper insights and ongoing management of data collect by tools HART has and create profiling of Accounts which can be used for deeper insights, supporting the app, allowing additional

There is a need to create an ongoing live list of account profiling which is updated / confirmed with each visit by a HART Educator.

Hart is making investments in other 3rd Party data around marketing, consumers, data gathering, and 3rd Party insights such as Google. Creating linkage to these and our data by packaging them into Account Profiles allows us to provide deeper insights in our results and service our clients with Account data.

Objectives:

Standardize Profiling for Accounts which can be leveraged for the Current HEMs app.

Provide a standardized tables of data which “Profiles” the attributes which are collected by Educators via HEMs App and survey app.

With data collection formally structured we need to create linkage to maintain master data (Account Master), while connecting these account attributes to the data insights we are creating.

Future we will need to be prepared to create new reporting leveraging Accounts attributes into visuals, future recommendations, and Ai insights.

Goals:
• Account Data Profile key attributes
• Connect HEMs App to provide attributes update (# displays, display locations in store, etc)
• Database View with Keys
• Output ready for – Reporting on Account Displayable, Account Types, Market Location, Neighborhood
• Profile prepared to connect with Consumer Profiles, Market Summaries, and

Considerations:
• Need new tables added.
• Consider looking at CooperCast Schema
• Crossbox Account / Product Keys need to added to the survey data for future reporting
• Crossbox Account / Product Master data must be used
• Need to determine how Educators are assigned Survey
• Considerations for API
• Consideration to management Master Account Data
• Connection to Current HEMs App
• Connection to Current HART Survey App

Dependencies:
• Current Account Master and Item Master (Brand Categories) are required to be used.
• Current data loads are manual, bulk/api Master data will be required.
• Accuracy depends on the Educator.
• Attribute Types / Sub Types are depended on Channel.

Acceptance Criteria
• Data Table(S) with all attributes
• Table View Linkage to Menu Data, Survey Data, Pictures
• Demonstration of Mapping / Reporting with attributes
• Account Master Linkage / direct view update with most recent updates
• Future preparation for Ai, Event Suggestions, and Exportability

Deliverables:

Account Profile Data Structure table should include the following:

Each Individual Account should be confirm
• Name of the Account
• Type of Account
• Change Date

Off Premise
independent or Off Premise Chain
• Type: Local Liquor, Local Wine, Beer/Wine
• Sub: Large Format, Corner Store, Gas Station, Grocery,
• Store Coldbox #
• Store Floor Displays # (Any points of purchase NOT on shelve)
• Store End Caps #
• Store Counter Y/N
• Store Window Displays Y/N

On Premise
Type of On Premise
• Bar, Bar/Restaurant, Event Space, Restaurant,
Sub
• Sports bar
• Italian Restaurant
• Roof Top Bar
• Hotel Bar
• White Table Cloth
• Music venue
• On-Premise Back Bar(s) #
• On-Premise Food Menu (Data Linkage to Menu)
• On-Premise Cocktail/Drink Menu y/n
• On Premise Wine Menu y/n
• On Premise Linkage to Cocktail menu data

The resulting data need to roll back and be reported in several different table with the result of creating formal profiles of data in addition to providing detailed plus summaried survey Results.

User Stories

Hart Executive Sales
• Our clients ask us to provide deep information around the market
• Brands ask for ways we can provide more insights and the deeper discussion on our execution around categorizing accounts allows us to sell more events.
• We have partners looking to benefit from more marketing insights we want to provide.
Hart Client Manager
• As a back house office manager, I need to provide recommendations on the market as to which accounts my clients should target based on the type and attributes of the account
• I need to create Live accurate Account data to assign events and educators.
• Clients ask for what accounts have certain attributes and as much as I know the market I cannot memorize every account in my market.
• Clients request deeper categorization on the what types of accounts are successful and what type of accounts are opportunities.
• I need to communicate what information I need to the educators to provide the correct and accurate market insights.
Educator
• As a field personnel I collect the data requested by the survey. It’s important that this doesn’t take too long and is easy for me to execute without making the retailer.
• I don’t have a lot of time and owners don’t like me conducting anything that doesn’t provide value to them.
• I need to ensure I am at the correct location an sometimes business change their names.
• I prefer to work on inputting information after taking photos so I am not in the store too long and creating too much attention to my actions.
• I need to use this script to conduct a Survey in each account Script to introduce the retailer to the survey.docx
•
Hart BI Analyst
• As a business intelligence analyst I need to create summary reports based on the data collected.
• I need accurate data to provide summaries back to our clients
• I need to provide excel spreadsheet and images to our clients
• Our clients can connect via API but I need to ensure the data shared is appropriate and accurate before sharing.
• Need to provide deeper analytical reviews on our Events, Surveys, and business results to our clients. I can do this with more attributes to filer, sort, and provide sub summarizes on.
• Need to talk deeper as to what the data stores are and it’s best to use categorizations to show where the wins and losses are.

################################################################################
################################################################################

##

## SECTION 4: PDF DOCUMENTS

##

################################################################################
################################################################################

================================================================================
FILE: Current HEMs Reporting Examples/Evaluation \_ Hart Event Management.pdf
(1 page — screenshot of evaluation report from portal.myhems.com)
================================================================================

Event: TOPS ADIRONDACK CREAMERY ICE CREAM UNY 2025 (POS & UNIFORMS)
Event Date: 11/8/2025, 3:00 PM to 5:00 PM
Account: TOPS (EAST AURORA PLAZA, EAST AURORA, NY, 14052)

Report Summary:

- Consumers Sampled: 35
- Bottles Used: 71
- Conversion Rate: 28.6
- Grand Total: $11.81

Gender Demographics: Male 42%, Female 47%
Age Demographics: 21-30: 27%, 30-40: 19%, 40-50: 33%, 51+: 7%
Ethnic Demographics: Caucasian 47%, Hispanic 19%, African American 42%, Native Hawaiian/Pacific Islander 5%, Asian 5%, Other 2%

Sample Data:

- Adirondack Creamery Dark Chocolate Sundae: 1
- Adirondack Creamery Cookies: 1
- Adirondack Creamery Vanilla: 3
- Adirondack Creamery Strawberry Shortcake: 4

Product Details (Product | Size | Price | Bottles Sold | Total):

- Adirondack Creamery Dark Chocolate Sundae | 2pk | $7.49 | 3 | $22.47
- Adirondack Creamery Cookies | 2pk | $7.49 | 1 | $7.49
- Adirondack Creamery Whole Milk Chip | 2pk | $7.49 | 0 | $0.00

Event Surveys (consumer responses):

- After sampling, did consumers go on to buy/purchase? Many did
- Did consumers use the display/in-store marketing? Good, offered cookies and more to push the product
- Main competitor brands consumers shopping for? None. Haagen Daz was not far away
- Strong need or desire for the brand/product? A little. Community was not too diverse. Not a huge ice cream selection to begin with
- Location is a good fit for this program with the right demographics and right sized floor
- Consumers were surprised to hear how little Adirondack Creamery's products cost during sampling
- "Was coming in for something else, but you just changed my mind"

Event Photos: 3 photos showing in-store sampling setup

================================================================================
FILE: Current HEMs Reporting Examples/SGWS AB survey Final.pdf
(16-page presentation: October 2025 Beer Survey for Anheuser-Busch / SGWS)
================================================================================

Cover: October 2025 BEER SURVEY — Hart Agency + Southern Glazer's Wine & Spirits

Focus Products:

- ANHEUSER-BUSCH: Budweiser, Bud Light, Michelob Ultra, Busch Light, Stella Artois
- RTD: Cutwater Spirits, Nutrl

Learnings & Insights — Accounts:

- 81% (480 of 589) carry beer
- 589 Total Accounts Surveyed: NYC 453, Queens 95, Bronx 28, Staten Island 13

Learnings & Insights — Draught:

- 52% Feature Draught
- 47% Have More Than 5 Lines
- Ranking: #1 Imports, #2 Domestic, #3 Craft

Learnings & Insights — RTD:

- 490 accounts carry RTD
- Ranking: #1 White Claw, #2 Surfside, #3 Highnoon

Top Draught: 1. Guinness, 2. Modelo, 3. Sierra Nevada, 4. Coors Light, 5. Miller Lite
Top Bottle: 1. Modelo, 2. Budweiser, 3. Coors Light, 4. Heineken, 5. Corona

Survey Overview:

- Physically visited accounts to assess purchasing behaviors of smaller and high-profile accounts in NYC, Queens, Bronx, Staten Island
- Identified barriers preventing direct purchasing from AB Distributing
- Many accounts labeled "unviable" are actually diverse — from small COD/cash accounts to influential venues

Key Findings — NOT BUYING DIRECT:
Many accounts source through:

- Third-Party Mini Distributors (frequent/local fast delivery, low minimums, personal relationships)
- Local Beer Retailers (flexible, smaller drop sizes)
- Grocery Stores (bundled purchasing)

Account Behavior Insights:

- Convenience & Loyalty: accounts prioritize speed, flexibility, small drop sizes
- Perceived Bureaucracy: AB seen as slower/less flexible
- Relationship Gap: local reps have stronger personal ties with owners
- Credibility Gap: AB loses leverage in premium placements without direct engagement

Challenges for A.B.:

- Loss of Control (tap handles, menu placements, innovation launches)
- Brand Dilution ("just another Big supplier")
- Margin Loss (middlemen capture value)
- Innovation Block (new products struggle without direct influence)

Path Forward — Building Credibility:

- Reframe A.B. as a Partner
- Offer Tailored Account Support (menu design, tap handle visibility, staff training)
- Deliver Value-Added Services (marketing/advertising support, co-branded promotions)
- Account Credibility (consistency, reliability, proactive problem-solving)
- Innovation First Access (direct-buying accounts get "first to market")

Small/Low Volume Accounts — 80/20 Rule:

- 80% resources to high-volume growable accounts
- 20% for carefully chosen small accounts with outsized influence
- Hart can assist with rebuilding relationships via dedicated ambassadors

High Profile Influential Accounts (examples):
Au Cheval, Barcade, Bathtub Gin, Blue Note, Bond St, Bowery Hotel, The Box, Bryant Park Grille, Caffe Dante, Cipriani, Catch, Chinese Tuxedo, Dirty French, Eataly, The Edition Hotels, Electric Room, Fools Gold, Fraunces Tavern, Gansevoort Hotel, Graduate Hotel, Joes Pub, Jungle Bird, JW Marriott, Katana Kitten, Lavanue at Saks, Mercer Hotel, Monkey Bar, Moxy Hotels, Mercado Little Spain, One World Observatory, Pebble Bar, PJ Clarkes, Rainbow Room, Red Rooster, Republica, Ricardos Steakhouse, Rose Mexicano, Soho Grand Hotel, Golf Club at Chelsea Piers, The Smith, The Ned Nomad, Tin Building, Zuma

No Surveys Allowed: Skylark @ 79, All Cipriani, Los Mariscos, Eataly, Dirty French, La Victoria, Electric Room, Sodexo, Village Vanguard, Bath Tub Gin, Soho House, Library Bar The Box, One World Observatory, and others

Permanently Closed: La Vecina, Bar Gonzo, Sons Of Essex, Midnight Theatre, Fotografiska, Cafe Frida, Sofrito 57, Dos Caminos Soho, Jacobs Pickle, and others

Name Changes: Local West → The Rutherford, Five Mile Stone → Cafe Maud, Avenue Bar and Kitchen → Florentin, Taco Beach → Taco Vista, Tagine → 21 Tacos, Baro → Capt Lou's Seafood

Seasonal Only: Sailors Choice, Grand Banks, USTA National Tennis, Riis Beach Cooperative, Drift In
Airport (Not Accessible): TWA Hotel, SSP America, United Club, Virgin Atlantic Lounges, and others

================================================================================
FILE: Current HEMs Application - Process- Examples/sql_document.pdf
(3 pages — HEMs database ER diagram from dbdiagram.io)
================================================================================

Database tables (from ER diagram):
account_details, account_email_type, account_class, act_grades, area_teams, account_invoices, brands, notes, company_categories, contact_types, ext_act_suppliers, company_contacts, billing_settings, evaluation_demographics, event_items, event_items_types, event_settings, event_setting_types, account_devices, brand_company_invoices, event_log_permissions, event_permissions, events, event_form_events, evaluations, company_managers, event_reports, event_photos, brand_suppliers, companies, event_types, event_managers, evaluation_surveys, regional_managers, role_permissions, event_marketing_triggers, event_evaluation_notifns, inventory_types, user_access, edu_tool_permissions, event_actions, act_mail_permissions, educator_notes, census_types

Enums:

- companies_company_type_enum: supplier, distributor, account
- evaluations_promotion_location_enum: front, back
- evaluations_weather_enum: sunny, cloudy, rain, warm, cold
- evaluations_weather1_enum: warm, cold, hot
- evaluations_door_traffic_enum: heavy, moderate, slow
- evaluation_demographics_type_enum: age, race
- events_wet_dry_enum: W, D
- notes_type_enum: user, company
- regional_managers_type_enum: region, territory

================================================================================
FILE: Current HEMs Application - Process- Examples/Event Form\_ Hart Event Management.pdf
(2 pages — event creation form from portal.myhems.com, dated 3/11/26)
================================================================================

Event Form Fields:

- Contact Details: Email (required)
- Event Details: Event Name, Event Date (required), Time From (required), Time To (required)
- Product Details: Select Product (with "+ More" button), Sample Bottles: 1
- Distributor: Distributor (required, dropdown)
- Supplier: Supplier (required, dropdown)
- Account Details: Account (required, dropdown)
- Notes: Special Instructions (text area)
- [Save button]
- Copyright Hart Event Management 2026-2027

================================================================================
FILE: 1 Technical Outlines/HART SaaS Technical Outline/HART Platfrom V1 Build - Ambar Outline - Jan 26.pdf
(4 pages — technical outline dated 1/12/2025)
================================================================================

"YOUR HART" Platform v1.0 — JFM26 Technical Outline

Overview:
Hart has an Event Marketing business servicing beverage companies by executing marketing, sampling, and event execution on behalf of beverage clients. Business extends to Alcohol Beverage, Beer, Beverages, Food, and Cannabis.

HEMs: the "HART Event Management" Program — currently in market as the "Core" Hart software application.

HART is expanding the HEMs business (event management app) to other event marketing companies via a new platform.

Objectives:
Develop and deploy a platform for companies to access a revamped HEMs application via web, provide customizable event and data collection at account level, manage educators. Includes Portal access, multi-client security management, payment processing, and clone HEMs environment.

Four Flows:

1. "Core" — Replace and update current HEMs into new Platform
2. "SaaS" — Single Vertical Configurable HEMs Environment for Top Clients (Data Markers)
3. "Affiliate" — Other Event/Marketing Companies sign up for HEMs as their Event Management Tool
4. "Data Portal" — Web Access for Data Institute (sign up, sign in, data insights on Accounts, Consumers, Market, Menus)

29 Goals including:

1. Transfer HEMs capabilities into New Platform
2. New iOS/Android App (Your HART)
3. 3rd Party Partnership integrations (Social, Consumers, Marketing)
4. New Questionnaire event configuration
5. New Data Warehouse Schema for Data Institute
6. New Data Structure for HEMs App/Platform
7. Master Data Tables for Reporting (Event Management, Reviews, ROI, Billing)
8. Image Warehouse Structure (Meta Tags, Hyperlinking)
9. AI LLM integration
10. Secured B2B Portal for Pilot Clients
11. Self-Sign up for Affiliate Clients with payment
    12-29. [Additional goals covering billing, training, help desk, Crossbox analytics, educator management, scoring/profiling, advanced analytics, data profiling, Data Institute, website redesign]

Considerations:

- MVP and business viable
- Mobile App may not need full clone
- Data connections differ per client
- Items/brands/accounts flexible across Food, Beverage, Alcohol, Cannabis
- iOS App needs to be native (not web) for memory leverage
- New programming base language
- Multiple security levels for event companies
- API Integrations for client BI systems

Dependencies:

- Must use current HEMs App Build
- New Account Master and Item Master required
- Current manual data loads need bulk/API migration
- AWS Cloud current setup
- New processes and training needed

Acceptance Criteria:

- Clients can create access and log into new Hart Portal
- Affiliate HEMs App Environment fully functional
- Mobile app connects to Web App and Crossbox
- Automated Reporting (consumer profiles, sales lift, ROI, market intelligence)
- Full training program for pilot clients
- FAQ and support documentation
- API Integrations (client BI systems + Crossbox Analytics)
- Electronic Invoicing (API-based)
- Usage reporting and metrics
- Migration Planning for transitioning clients
- Phase 2 Technical recommendations

================================================================================
FILE: HEMs AI and AWS Notes/HEMs Ai Standing API Notes and AWS.pdf
(2 pages — email thread dated 3/3/2026)
================================================================================

From: Hiren Patel <Hiren@BITs.Software> (Managing Partner, BITs Software LLC, Cerritos, CA)
To: Christopher Azrak <Christopher@hartagencyny.com> (CTO, Hart Agency); rblaha@clearset.ai
Cc: Yasmine (CSai) <yasmine.gardiner@clearset.ai>
Date: 3/3/2026
Subject: Re: HART AI

AWS Infrastructure Details:

- VPC ID: vpc-cf77a7b5 (N.Virginia Region default VPC)
- Production Database: portal-myhems-prod.cz90ylzkqopr.us-east-1.rds.amazonaws.com
- Staging: local mysql on server (no RDS)
- Production S3: myhems-prod
- Staging S3: myhems-demo

Original request from Christopher Azrak (2/28/2026):

- Confirming infrastructure for HART API integration
- Aligning intake_api, classifier, and menu_extractor services with AWS beta environment
- Requesting addition of Kerwin, Will, and Yasmine to group chat
- Offering GitHub repo access

Christopher Azrak — Chief Technology Officer
954.667.3337 | christopher@hartagencyny.com
1233 Walt Whitman Rd, Melville, NY 11747

################################################################################
################################################################################

##

## SECTION 5: SPREADSHEET DATA (xlsx)

##

################################################################################
################################################################################

================================================================================
FILE: WAGNER 2025.xlsx
PATH: /Users/ethan/Library/CloudStorage/OneDrive-SharedLibraries-HartAgencyNY/Ambar-HART Teams Site - Documents/Ambar-Development/Current HEMs Reporting Examples/WAGNER 2025.xlsx
================================================================================
Sheets: ['Events_011226_073935']

--- Sheet: Events*011226_073935 (rows: 504, cols: 40) ---
Event Id | SLA Approve | Event Name | Type | Date | Start Time | End Time | Approved | Distributor | Distributor Contacts | Supplier | Supplier Contacts | Booking Division / Rep | Account | Address | City | State | Zip | Phone | Account Contacts | Region | Territory | Educators | No of Educators | Event Amount | Max Ambassador Amount | Ambassador Amount | Supplemental Finance Charge | Ambassador Expense After QB | Travel Amount | Gratuity | Event Total | Product | Bottles Sold | Consumers Sampled | Southern Id | TD LINKS | Liqour License | Created By | Created Date
531298 | | WAGNER METRO 2025 | Off Premises | 2025-01-04 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | PRICE RITE | 689 OLD COUNTRY RD | DIX HILLS | NEW YORK | 11746 | (631) 549-8899 | | Long Island | Suffolk | Helena Diringerova | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum White, Conundrum Red, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Sea Sun Chardonnay, Caymus Vineyards Cabernet Sauvignon California | 13 | 18 | 1382 | 1410403 | 1146347 | Leah Guidarelli | 2024-12-17 00:00:00
531299 | | WAGNER METRO 2025 | Off Premises | 2025-01-17 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | PRICE RITE | 689 OLD COUNTRY RD | DIX HILLS | NEW YORK | 11746 | (631) 549-8899 | | Long Island | Suffolk | Helena Diringerova | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum White, Conundrum Red, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Sea Sun Chardonnay, Caymus Vineyards Cabernet Sauvignon California | 21 | 18 | 1382 | 1410403 | 1146347 | Leah Guidarelli | 2024-12-17 00:00:00
531752 | | WAGNER METRO 2025 | Off Premises | 2025-01-24 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | HAPPY LIQUORS | 40-40 COLLEGE POINT BLVD | FLUSHING | NEW YORK | 11354 | (718) 808-5337 | | Metro | Queens | Ashley Jenkins | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Red Schooner Voyage 11, Red Schooner Transit 3, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Caymus-Suisan Walking Fool Red, Caymus Vineyards Cabernet Sauvignon California | 3 | 12 | | | | Leah Guidarelli | 2024-12-30 00:00:00
532447 | | WAGNER METRO 2025 | Off Premises | 2025-01-24 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | HB LIQUORS @ COSTCO | 20 STEW LEONARD DRIVE | YONKERS | NEW YORK | 10710 | (914) 375-9292 | | Long Island | Westchester | Tatyana Sekerina | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Mer Soleil Silver Chardonnay, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Conundrum Red, Caymus Vineyards Cabernet Sauvignon California | 14 | 24 | 22112 | 978469 | 1207364 | Leah Guidarelli | 2025-01-10 00:00:00
532403 | | WAGNER METRO 2025 | Off Premises | 2025-01-24 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | ALLSTAR W&L | 248-12 NORTHERN BLVD | LITTLE NECK | NEW YORK | 11362 | (718) 819-0388 | | Metro | Queens | Cindy Martinez | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 3.67 | 241.67 | Conundrum White, Red Schooner Transit 3, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Conundrum Red, Sea Sun Pinot Noir, Emmolo Sauvignon Blanc | 4 | 17 | 44486 | | 1257485 | Leah Guidarelli | 2025-01-10 00:00:00
532404 | | WAGNER METRO 2025 | Off Premises | 2025-01-24 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | CLEARVIEW 168 INC | 20517 35TH AVE | BAYSIDE | NEW YORK | 11361 | (718) 224-4446 | | Metro | Queens | Laura David | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Emmolo Merlot, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Caymus Vineyards Cabernet Sauvignon California | 2 | 12 | 61097 | 1445953 | 1267339 | Leah Guidarelli | 2025-01-10 00:00:00
532448 | | WAGNER METRO 2025 | Off Premises | 2025-01-31 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | HB LIQUORS @ COSTCO | 20 STEW LEONARD DRIVE | YONKERS | NEW YORK | 10710 | (914) 375-9292 | | Long Island | Westchester | Camilla Ivy | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Mer Soleil Silver Chardonnay, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Conundrum Red, Caymus Vineyards Cabernet Sauvignon California, Caymus-Suisan Walking Fool Red | 11 | 16 | 22112 | 978469 | 1207364 | Leah Guidarelli | 2025-01-10 00:00:00
533076 | | WAGNER UNY OFF 2025 | Off Premises | 2025-01-31 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | PUTNAM WINE & LIQUORS (545 ROUTE 6, MAHOPAC 59542) | 545 ROUTE 6 (MAIN ST) | MAHOPAC | NEW YORK | | (845) 628-8808 | | Hudson Valley/Rockland | | Claudia Coroban | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Emmolo Sauvignon Blanc, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Sea Sun Chardonnay, Mer Soleil Chardonnay Reserve, Sea Sun Pinot Noir | 11 | 50 | 59542 | 1427866 | 2157823 | Kimberly Danielewicz | 2025-01-15 00:00:00
533103 | | WAGNER UNY OFF 2025 | Off Premises | 2025-01-31 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | CHARELS LIQUOR | 1606 ROUTE 82 | LAGRANGEVILLE | NEW YORK | | (845) 223-5700 | | Hudson Valley/Rockland | | Amy Miccio | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Sea Sun Chardonnay, Sea Sun Pinot Noir, Conundrum Red, Emmolo Sauvignon Blanc | 11 | 15 | 11969 | 1409346 | 20-05214 | Kimberly Danielewicz | 2025-01-15 00:00:00
533368 | | WAGNER METRO 2025 | Off Premises | 2025-01-31 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | BROADWAY LIQUORS & WINES WAREHOUSE | 5790 BROADWAY | BRONX | NEW YORK | 10463 | (347) 843-8329 | | Metro | Bronx | Paula Parra | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus-Suisan Walking Fool Red, Emmolo Sauvignon Blanc, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7 | 11 | 31 | 50730 | | 1296935 | Leah Guidarelli | 2025-01-21 00:00:00
532568 | | WAGNER METRO 2025 | Off Premises | 2025-02-01 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | WESTCHESTER WINE WAREHOUSE | 53 TARRYTOWN RD | WHITE PLAINS | NEW YORK | 10607 | (914) 824-1400 | | Long Island | Westchester | Giselle Cruz | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Mer Soleil Silver Chardonnay, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Conundrum White, Conundrum Red, Caymus Vineyards Cabernet Sauvignon California | 13 | 26 | 1780 | 1746083 | 1131175 | Leah Guidarelli | 2025-01-13 00:00:00
533627 | | WAGNER UNY ON 2025 (SAMPLES) FRIENDS OF STRONG EVENT | On Premises | 2025-02-07 00:00:00 | 18:30:00 | 22:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | MONROE GOLF CLUB | 155 GOLF AVE | PITTSFORD | NEW YORK | | | | Rochester | | Bernadette Rizzo | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Mer Soleil Chardonnay Reserve Monterey, Sea Sun Pinot Noir, Conundrum Red, Caymus Vineyards Cabernet Sauvignon California | 0 | 120 | 25799 | 5113976 | | Leah Guidarelli | 2025-01-24 00:00:00
533369 | | WAGNER METRO 2025 | Off Premises | 2025-02-08 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | BROADWAY LIQUORS & WINES WAREHOUSE | 5790 BROADWAY | BRONX | NEW YORK | 10463 | (347) 843-8329 | | Metro | Bronx | Jennie Ortiz | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum White, Conundrum Red, Mer Soleil Santa Lucia Highlands Reserve Chardonnay, Caymus Vineyards Cabernet Sauvignon California | 16 | 40 | 50730 | | 1296935 | Leah Guidarelli | 2025-01-21 00:00:00
533075 | | WAGNER METRO 2025 | Off Premises | 2025-02-14 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | BEVERAGE LOVERS WAREHOUSE / LWW VALLEY STREAM | 22 W CIRCLE DR | VALLEY STREAM | NEW YORK | 11581 | (516) 887-9463 | | Long Island | Nassau | Sandra Verene | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus-Suisan Walking Fool Red, Emmolo Sauvignon Blanc, Mer Soleil Chardonnay Reserve Monterey, Caymus Vineyards Cabernet Sauvignon California | 29 | 35 | 54697 | | 1313465 | Leah Guidarelli | 2025-01-15 00:00:00
532460 | | WAGNER METRO 2025 | Off Premises | 2025-02-15 00:00:00 | 15:00:00 | 18:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | SEAHOLM'S W & L | 134 WALL ST | HUNTINGTON | NEW YORK | 11743 | (631) 427-0031 | | Long Island | Nassau | Jessica Bohn | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Mer Soleil Silver Chardonnay, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Conundrum White, Caymus Vineyards Cabernet Sauvignon California, Caymus-Suisan Walking Fool Red | 8 | 16 | 40552 | | 1268656 | Leah Guidarelli | 2025-01-10 00:00:00
534415 | | WAGNER UNY OFF 2025 | Off Premises | 2025-02-21 00:00:00 | 15:00:00 | 18:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | MAHAN'S DISCOUNT LIQUOR & | 6515 BROCKPORT SPENCERPORT RD | BROCKPORT | NEW YORK | 14420 | (585) 637-4149 | | Rochester | | Rachel Hovey | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus Vineyards Cabernet Sauvignon California, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Sea Sun Chardonnay, Sea Sun Pinot Noir | 6 | 30 | 54417 | 1410030 | 3009646 | Kimberly Danielewicz | 2025-02-01 00:00:00
535873 | | WAGNER METRO 2025 | Off Premises | 2025-02-22 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | ALLSTAR W&L | 248-12 NORTHERN BLVD | LITTLE NECK | NEW YORK | 11362 | (718) 819-0388 | | Metro | Queens | Cindy Martinez | 1 | 238 | 0 | 0 | 0 | 0 | 3.67 | 0 | 241.67 | Mer Soleil Chardonnay Reserve Monterey, Sea Sun Pinot Noir, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Conundrum Red, Conundrum White, Red Schooner Transit 3, Emmolo Sauvignon Blanc | 3 | 8 | 44486 | | 1257485 | Leah Guidarelli | 2025-02-13 00:00:00
536327 | | WAGNER METRO 2025 | Off Premises | 2025-02-28 00:00:00 | 14:00:00 | 17:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | PRICE RITE | 689 OLD COUNTRY RD | DIX HILLS | NEW YORK | 11746 | (631) 549-8899 | | Long Island | Suffolk | Helena Diringerova | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum White, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Sea Sun Chardonnay, Conundrum Red | 11 | 12 | 1382 | 1410403 | 1146347 | Leah Guidarelli | 2025-02-18 00:00:00
535957 | | WAGNER METRO 2025 | Off Premises | 2025-02-28 00:00:00 | 15:00:00 | 18:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | K H & H/LONG ISLAND CITY LIQ | 3250 VERNON BLVD | LONG ISLAND CITY | NEW YORK | 11106 | (718) 267-2992 | | Metro | Queens | Mary Scocozza | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Sea Sun Pinot Noir, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Conundrum Red | 20 | 45 | 17009 | 2042240 | 1166978 | Leah Guidarelli | 2025-02-13 00:00:00
535958 | | WAGNER METRO 2025 | Off Premises | 2025-03-07 00:00:00 | 15:00:00 | 18:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | K H & H/LONG ISLAND CITY LIQ | 3250 VERNON BLVD | LONG ISLAND CITY | NEW YORK | 11106 | (718) 267-2992 | | Metro | Queens | Mary Scocozza | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Sea Sun Pinot Noir, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Conundrum Red | 14 | 35 | 17009 | 2042240 | 1166978 | Leah Guidarelli | 2025-02-13 00:00:00
533102 | | WAGNER UNY OFF 2025 | Off Premises | 2025-03-07 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | CHARELS LIQUOR | 1606 ROUTE 82 | LAGRANGEVILLE | NEW YORK | | (845) 223-5700 | | Hudson Valley/Rockland | | Natasha Vangor | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Sea Sun Chardonnay, Sea Sun Pinot Noir, Mer Soleil Silver Chardonnay, Conundrum Red | 9 | 30 | 11969 | 1409346 | 20-05214 | Kimberly Danielewicz | 2025-01-15 00:00:00
534994 | | WAGNER METRO 2025 | Off Premises | 2025-03-07 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | ELMSFORD WINE & LIQUORS (MAIN ST) | 111 E MAIN ST | ELMSFORD | NEW YORK | 10523 | (914) 909-4760 | | Long Island | Westchester | Alexa Langiulli | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Sea Sun Chardonnay, Sea Sun Pinot Noir, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7 | 7 | 23 | 54251 | | 1312770 | Leah Guidarelli | 2025-02-06 00:00:00
536362 | | WAGNER UNY OFF 2025 | Off Premises | 2025-03-08 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | WEBSTER WINE & SPIRITS (960 RIDGE RD, #12288) | 960 RIDGE RD | WEBSTER | NEW YORK | | (585) 671-1686 | | Rochester | | Luke Lobsinger | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus Vineyards Cabernet Sauvignon California, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Sea Sun Pinot Noir, Mer Soleil Chardonnay Reserve Monterey | 8 | 35 | 12288 | 1428095 | 3009671 | Kimberly Danielewicz | 2025-02-18 00:00:00
536427 | | WAGNER METRO 2025 \*\*\_WOMAN WINE MAKER EVENT*** | Off Premises | 2025-03-08 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | RYANN'S WINES | 1897 FRONT ST | EAST MEADOW | NEW YORK | 11554 | (516) 962-8250 | | Long Island | Nassau | Dianna Amini | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Emmolo Sauvignon Blanc, Emmolo Merlot | 2 | 20 | 51989 | 1409910 | 1307045 | Leah Guidarelli | 2025-02-18 00:00:00
536582 | | WAGNER METRO 2025 | Off Premises | 2025-03-14 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | WESTBURY LIQUORS | 1250 OLD COUNTRY RD | WESTBURY | NEW YORK | 11590 | (516) 832-8602 | | Long Island | Nassau | Ann Battistelli | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Sea Sun Pinot Noir, Sea Sun Chardonnay, Caymus-Suisan Walking Fool Red, Caymus Vineyards Cabernet Sauvignon California | 7 | 24 | 11234 | 1410770 | 1117174 | Leah Guidarelli | 2025-02-19 00:00:00
536843 | | WAGNER UNY OFF 2025 | Off Premises | 2025-03-14 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | LATTA LONG LIQUOR | 3177 LATTA RD | ROCHESTER | NEW YORK | | (585) 227-9463 | | Rochester | | Kim DeNoto | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Conundrum Red, Mer Soleil Silver Chardonnay, Sea Sun Chardonnay | 15 | 20 | 12294 | 765622 | 3118384 | Kimberly Danielewicz | 2025-02-21 00:00:00
536321 | | WAGNER METRO 2025 | Off Premises | 2025-03-14 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | EAST CHELSEA SPIRITS INC / LIQUOR UP & WINE DOWN | 383 FIRST AVE | NEW YORK | NEW YORK | 10010 | (646) 964-4173 | | Metro | New York | Russell Marisak | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Sea Sun Pinot Noir, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Sea Sun Chardonnay | 10 | 41 | 53548 | 762812 | 1308045 | Leah Guidarelli | 2025-02-18 00:00:00
538431 | | WAGNER METRO 2025 | Off Premises | 2025-03-14 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | PRICE RITE | 689 OLD COUNTRY RD | DIX HILLS | NEW YORK | 11746 | (631) 549-8899 | | Long Island | Suffolk | Helena Diringerova | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum Red, Conundrum White, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Sea Sun Chardonnay | 13 | 17 | 1382 | 1410403 | 1146347 | Leah Guidarelli | 2025-03-04 00:00:00
539199 | | WAGNER METRO 2025 | Off Premises | 2025-03-14 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | CLEARVIEW 168 INC | 20517 35TH AVE | BAYSIDE | NEW YORK | 11361 | (718) 224-4446 | | Metro | Queens | Laura David | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum Red, Conundrum White, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Sea Sun Pinot Noir | 4 | 15 | 61097 | 1445953 | 1267339 | Leah Guidarelli | 2025-03-07 00:00:00
538297 | | WAGNER METRO 2025 **\***SGWS SIGNATURE GRAND EVENT\***\* | Off Premises | 2025-03-15 00:00:00 | 13:00:00 | 17:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | WESTCHESTER WINE WAREHOUSE | 53 TARRYTOWN RD | WHITE PLAINS | NEW YORK | 10607 | (914) 824-1400 | | Long Island | Westchester | Melinda Moray | 1 | 317 | 0 | 0 | 0 | 0 | 2.7 | 0 | 319.7 | Conundrum Red, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Conundrum White, Mer Soleil Chardonnay Reserve, Caymus Vineyards Cabernet Sauvignon California | 7 | 50 | 1780 | 1746083 | 1131175 | Leah Guidarelli | 2025-03-02 00:00:00
538408 | | WAGNER METRO 2025 | Off Premises | 2025-03-15 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | MAYS LIQUOR WAREHOUSE OF FREEPORT | 101 105 BUFFALO AVE | FREEPORT | NEW YORK | 11520 | (516) 939-4637 | | Long Island | Nassau | Angela Rosenfeld | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum Red, Conundrum White, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Mer Soleil Santa Lucia Highlands Reserve Chardonnay | 4 | 15 | 50743 | | 1301754 | Leah Guidarelli | 2025-03-03 00:00:00
536842 | | WAGNER UNY OFF 2025 | Off Premises | 2025-03-20 00:00:00 | 15:00:00 | 18:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | LIQUOR BOX (3670 MT READ BLVD) | 3670 MT READ BLVD | ROCHESTER | NEW YORK | | (585) 448-1998 | | Rochester | | Deanna Wasley | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Conundrum Red, Mer Soleil Silver Chardonnay, Sea Sun Chardonnay, Sea Sun Pinot Noir | 14 | 25 | 52313 | 1998896 | 3009714 | Kimberly Danielewicz | 2025-02-21 00:00:00
536583 | | WAGNER METRO 2025 | Off Premises | 2025-03-21 00:00:00 | 15:00:00 | 18:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | WESTBURY LIQUORS | 1250 OLD COUNTRY RD | WESTBURY | NEW YORK | 11590 | (516) 832-8602 | | Long Island | Nassau | Aileen Turizo | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Sea Sun Pinot Noir, Caymus-Suisan Walking Fool Red, Caymus Vineyards Cabernet Sauvignon California | 11 | 22 | 11234 | 1410770 | 1117174 | Leah Guidarelli | 2025-02-19 00:00:00
536841 | | WAGNER UNY OFF 2025 | Off Premises | 2025-03-21 00:00:00 | 15:00:00 | 18:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | EASTWAY LIQUOR | 1217 BAY ROAD | WEBSTER | NEW YORK | | (585) 671-4594 | | Rochester | | Ellen Muto | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Conundrum Red, Conundrum White, Mer Soleil Chardonnay Reserve | 36 | 38 | 12215 | 1409560 | | Kimberly Danielewicz | 2025-02-21 00:00:00
535792 | | WAGNER UNY OFF 2025 | Off Premises | 2025-03-21 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | DEPOT WINE & LIQUORS | 100 INDEPENDENT WAY | BREWSTER | NEW YORK | 10509 | (845) 279-0112 | | Hudson Valley/Rockland | | Jeremy Holiday | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus Vineyards Cabernet Sauvignon California, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Sea Sun Chardonnay, Sea Sun Pinot Noir, Conundrum Red | 11 | 20 | 41731 | 1878375 | 2191466 | Kimberly Danielewicz | 2025-02-12 00:00:00
536840 | | WAGNER UNY OFF 2025 | Off Premises | 2025-03-21 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | IRONDEQUOIT PLAZA LIQ MAR | 525 TITUS AVE | ROCHESTER | NEW YORK | | (585) 467-8420 | | Rochester | | Deanna Wasley | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Sea Sun Pinot Noir, Sea Sun Chardonnay, Conundrum Red, Conundrum White | 7 | 20 | 62413 | 1409808 | 3171632 | Kimberly Danielewicz | 2025-02-21 00:00:00
537838 | | WAGNER METRO 2025 | Off Premises | 2025-03-21 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | SPIRITS OF CARMINE | 52 CARMINE ST | NEW YORK | NEW YORK | 10014 | (212) 206-0091 | | Metro | New York | Russell Marisak | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Sea Sun Pinot Noir, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Conundrum White | 5 | 18 | 872 | 1488011 | 1023606 | Allison Ackerman | 2025-02-27 00:00:00
539871 | | WAGNER METRO 2025 | Off Premises | 2025-03-27 00:00:00 | 15:00:00 | 18:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | K H & H/LONG ISLAND CITY LIQ | 3250 VERNON BLVD | LONG ISLAND CITY | NEW YORK | 11106 | (718) 267-2992 | | Metro | Queens | Mary Scocozza | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum Red, Caymus-Suisan Walking Fool Red, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Sea Sun Pinot Noir, Caymus Vineyards Cabernet Sauvignon California, Mer Soleil Santa Lucia Highlands Reserve Chardonnay | 11 | 20 | 17009 | 2042240 | 1166978 | Leah Guidarelli | 2025-03-12 00:00:00
539935 | | WAGNER METRO 2025 | Off Premises | 2025-03-28 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | WHITESTONE LIQUORS INC | 20 18 FRANCIS LEWIS BLVD | WHITESTONE | NEW YORK | | (718) 746-8700 | | Metro | Queens | Laura David | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum Red, Conundrum White, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Sea Sun Pinot Noir, Caymus Vineyards Cabernet Sauvignon California, Sea Sun Chardonnay | 3 | 22 | | | | Leah Guidarelli | 2025-03-13 00:00:00
540378 | | WAGNER METRO 2025 | Off Premises | 2025-03-28 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | COVERT LIQUORS | 94 COVERT AVE | STEWART MANOR | NEW YORK | 11530 | (516) 488-4800 | | Long Island | Nassau | Regine Hoveling | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Sea Sun Pinot Noir, Caymus Vineyards Cabernet Sauvignon California, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Emmolo Sauvignon Blanc | 13 | 24 | 41098 | | 1269949 | Leah Guidarelli | 2025-03-17 00:00:00
538432 | | WAGNER METRO 2025 | Off Premises | 2025-03-28 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | PRICE RITE | 689 OLD COUNTRY RD | DIX HILLS | NEW YORK | 11746 | (631) 549-8899 | | Long Island | Suffolk | Helena Diringerova | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum Red, Conundrum White, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Sea Sun Chardonnay | 13 | 17 | 1382 | 1410403 | 1146347 | Leah Guidarelli | 2025-03-04 00:00:00
540413 | | WAGNER METRO 2025 | Off Premises | 2025-03-29 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | LEISER'S LIQUORS INC | 4130 162ND ST | FLUSHING | NEW YORK | 11358 | (718) 359-3106 | | Metro | Queens | Nolga Batista | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum White, Caymus Vineyards Cabernet Sauvignon California, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Conundrum Red, Caymus-Suisan Walking Fool Red, Emmolo Merlot | 9 | 26 | 1409 | 1409953 | 1039213 | Leah Guidarelli | 2025-03-17 00:00:00
541352 | | WAGNER METRO 2025 | Off Premises | 2025-04-04 00:00:00 | 14:00:00 | 17:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | WINE MARKET OF NEW HYDE P | 2337 NEW HYDE PARK RD | NEW HYDE PARK | NEW YORK | 11040 | (516) 328-8800 | | Long Island | Nassau | Regine Hoveling | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum Red, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Emmolo Sauvignon Blanc | 4 | 20 | 16477 | 2016841 | 1171509 | Leah Guidarelli | 2025-03-26 00:00:00
538633 | | WAGNER METRO 2025 | Off Premises | 2025-04-04 00:00:00 | 15:00:00 | 18:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | WHEATLEY HILLS DISC. LIQ | 193 POST AVE. | WESTBURY | NEW YORK | 11590 | (516) 333-1110 | | Long Island | Nassau | Meri Wapnick | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum Red, Conundrum White, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Mer Soleil Silver Chardonnay | 9 | 28 | 63888 | 1410777 | 1015942 | Leah Guidarelli | 2025-03-05 00:00:00
539872 | | WAGNER METRO 2025 | Off Premises | 2025-04-04 00:00:00 | 15:00:00 | 18:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | K H & H/LONG ISLAND CITY LIQ | 3250 VERNON BLVD | LONG ISLAND CITY | NEW YORK | 11106 | (718) 267-2992 | | Metro | Queens | Allyson Ansel | 1 | 238 | 0 | 0 | 0 | 0 | 3 | 0 | 241 | Conundrum Red, Caymus-Suisan Walking Fool Red, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Sea Sun Pinot Noir, Caymus Vineyards Cabernet Sauvignon California, Mer Soleil Santa Lucia Highlands Reserve Chardonnay | 7 | 34 | 17009 | 2042240 | 1166978 | Leah Guidarelli | 2025-03-12 00:00:00
537356 | | WAGNER UNY OFF 2025 | Off Premises | 2025-04-04 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | PITTSFORD CENTURY WINES & (WEGMANS) | 3349 MONROE AVE #55 | ROCHESTER | NEW YORK | 14618 | (585) 248-0931 | | Rochester | | Maggie O'brien | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Sea Sun Pinot Noir, Mer Soleil Chardonnay Reserve Monterey, Conundrum White | 21 | 40 | 3458 | 2199578 | 3135403 | Kimberly Danielewicz | 2025-02-25 00:00:00
539936 | | WAGNER METRO 2025 | Off Premises | 2025-04-04 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | WHITESTONE LIQUORS INC | 20 18 FRANCIS LEWIS BLVD | WHITESTONE | NEW YORK | | (718) 746-8700 | | Metro | Queens | Laura David | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Emmolo Merlot, Mer Soleil Santa Lucia Highlands Reserve Chardonnay, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Caymus Vineyards Cabernet Sauvignon California | 2 | 10 | | | | Leah Guidarelli | 2025-03-13 00:00:00
536322 | | WAGNER METRO 2025 | Off Premises | 2025-04-04 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | EAST CHELSEA SPIRITS INC / LIQUOR UP & WINE DOWN | 383 FIRST AVE | NEW YORK | NEW YORK | 10010 | (646) 964-4173 | | Metro | New York | Zipporah Arthur | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Sea Sun Pinot Noir, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Sea Sun Chardonnay | 7 | 20 | 53548 | 762812 | 1308045 | Leah Guidarelli | 2025-02-18 00:00:00
541317 | | WAGNER METRO 2025 | Off Premises | 2025-04-04 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | ON THE ROCKS WINE & LIQUOR | 890 4TH AVE | BROOKLYN | NEW YORK | 11232 | (718) 788-0026 | | Metro | Brooklyn | Shevonne Nicole Zaccheo | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum Red, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7 | 3 | 10 | 45018 | | 1280414 | Leah Guidarelli | 2025-03-25 00:00:00
540376 | | WAGNER METRO 2025 | Off Premises | 2025-04-05 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | HB LIQUORS @ COSTCO | 20 STEW LEONARD DRIVE | YONKERS | NEW YORK | 10710 | (914) 375-9292 | | Long Island | Westchester | Giselle Cruz | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Mer Soleil Silver Chardonnay, Caymus Vineyards Cabernet Sauvignon California, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Caymus-Suisan Walking Fool Red | 8 | 33 | 22112 | 978469 | 1207364 | Leah Guidarelli | 2025-03-17 00:00:00
540411 | | WAGNER METRO 2025 | Off Premises | 2025-04-05 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | 5 STAR WINE & LIQUORS | 59 12 WOODSIDE AVE | WOODSIDE | NEW YORK | 11377 | (718) 779-1800 | | Metro | Queens | Sheila Jean-Baptiste | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum White, Caymus Vineyards Cabernet Sauvignon California, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Conundrum Red, Caymus-Suisan Walking Fool Red | 5 | 25 | 42458 | 1485505 | 1272682 | Leah Guidarelli | 2025-03-17 00:00:00
537611 | | WAGNER METRO 2025 | Off Premises | 2025-04-06 00:00:00 | 14:00:00 | 17:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | HUB LIQUORS | 300 E 149TH ST | BRONX | NEW YORK | 10451 | (917) 801-0968 | | Metro | Bronx | Paula Parra | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum Red, Caymus Vineyards Cabernet Sauvignon California | 7 | 38 | 42169 | | 1260183 | Allison Ackerman | 2025-02-26 00:00:00
539873 | | WAGNER METRO 2025 | Off Premises | 2025-04-11 00:00:00 | 15:00:00 | 18:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | K H & H/LONG ISLAND CITY LIQ | 3250 VERNON BLVD | LONG ISLAND CITY | NEW YORK | 11106 | (718) 267-2992 | | Metro | Queens | Kenneth Jacowitz | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum Red, Caymus-Suisan Walking Fool Red, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Sea Sun Pinot Noir, Caymus Vineyards Cabernet Sauvignon California, Mer Soleil Santa Lucia Highlands Reserve Chardonnay | 16 | 30 | 17009 | 2042240 | 1166978 | Leah Guidarelli | 2025-03-12 00:00:00
541487 | | WAGNER METRO 2025 | Off Premises | 2025-04-11 00:00:00 | 15:00:00 | 18:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | DOUGLASTON W&S (FEMALE ONLY) | 242 02 61ST AVE | DOUGLASTON | NEW YORK | 11362 | (718) 281-0868 | | Metro | Queens | Cristian Feliz Tamarez | 1 | 238 | 0 | 0 | 0 | 0 | 5.43 | 0 | 243.43 | Caymus-Suisan Walking Fool Red, Sea Sun Pinot Noir, Emmolo Sauvignon Blanc | 6 | 19 | 40467 | | 1267004 | Leah Guidarelli | 2025-03-26 00:00:00
534995 | | WAGNER METRO 2025 | Off Premises | 2025-04-11 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | ELMSFORD WINE & LIQUORS (MAIN ST) | 111 E MAIN ST | ELMSFORD | NEW YORK | 10523 | (914) 909-4760 | | Long Island | Westchester | Michelle Debonis-Matica | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Mer Soleil Chardonnay Reserve Monterey, Caymus Vineyards Cabernet Sauvignon California, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7 | 7 | 20 | 54251 | | 1312770 | Leah Guidarelli | 2025-02-06 00:00:00
540502 | | WAGNER METRO 2025 | Off Premises | 2025-04-11 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | STEW LEONARD'S / VINEYARDS OF FARMINGDALE | 210 AIRPORT PLAZA | FARMINGDALE | NEW YORK | 11735 | (631) 249-3611 | | Long Island | Suffolk | Reyna Caraballo | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum White, Conundrum Red, Emmolo Sauvignon Blanc, Emmolo Merlot, Caymus Vineyards Cabernet Sauvignon California | 5 | 18 | 1777 | 1732052 | 1127678 | Leah Guidarelli | 2025-03-18 00:00:00
539456 | | WAGNER UNY OFF 2025 | Off Premises | 2025-04-11 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | FOUR SEASONS SPIRITS & WI | 2833 RIDGE ROAD W SUITE 9A | ROCHESTER | NEW YORK | | (585) 225-7730 | | Rochester | | Kim Palumbo | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Sea Sun Pinot Noir, Conundrum White, Caymus Vineyards Cabernet Sauvignon California, Mer Soleil Chardonnay Reserve | 29 | 96 | 524 | 766881 | 3147690 | Kimberly Danielewicz | 2025-03-10 00:00:00
540412 | | WAGNER METRO 2025 | Off Premises | 2025-04-11 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | 5 STAR WINE & LIQUORS | 59 12 WOODSIDE AVE | WOODSIDE | NEW YORK | 11377 | (718) 779-1800 | | Metro | Queens | Jasmine Spiess | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum White, Caymus Vineyards Cabernet Sauvignon California, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Conundrum Red, Caymus-Suisan Walking Fool Red | 2 | 19 | 42458 | 1485505 | 1272682 | Leah Guidarelli | 2025-03-17 00:00:00
541640 | | WAGNER METRO 2025 | Off Premises | 2025-04-11 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | ALLSTAR W&L | 248-12 NORTHERN BLVD | LITTLE NECK | NEW YORK | 11362 | (718) 819-0388 | | Metro | Queens | Cindy Martinez | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Red Schooner Transit 3, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Caymus-Suisan Grand Durif, Sea Sun Pinot Noir, Sea Sun Chardonnay, Emmolo Sauvignon Blanc | 4 | 10 | 44486 | | 1257485 | Leah Guidarelli | 2025-03-27 00:00:00
542546 | | WAGNER METRO 2025 | Off Premises | 2025-04-11 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | BRYANT PARK WINES | 108 W 42ND ST | NEW YORK | NEW YORK | | (646) 398-7766 | | Metro | New York | Zipporah Arthur | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Sea Sun Chardonnay, Conundrum Red, Sea Sun Pinot Noir, Conundrum White | 3 | 12 | 60854 | | | Leah Guidarelli | 2025-04-03 00:00:00
541523 | | WAGNER METRO 2025 | Off Premises | 2025-04-12 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | ALEX'S DISCOUNT/ DAVE'S DISCOUNT LIQ&WINE | 1645 86TH STREET | BROOKLYN | NEW YORK | 11214 | (718) 234-9399 | | Metro | Brooklyn | Arvanda Lilly | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus Vineyards Cabernet Sauvignon California, Mer Soleil Chardonnay Reserve Monterey, Conundrum Red, Red Schooner Voyage 11 | 5 | 16 | 384 | 659947 | 1264683 | Leah Guidarelli | 2025-03-26 00:00:00
541631 | | WAGNER METRO 2025 | Off Premises | 2025-04-12 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | LIQUOR LAND OF NY | 3756-3758 NOSTRAND AVE | BROOKLYN | NEW YORK | 11235 | (718) 975-7070 | | Metro | Brooklyn | Alan Bemben | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus-Suisan Walking Fool Red, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Red Schooner Voyage 11 | 2 | 20 | 43091 | | 1269960 | Leah Guidarelli | 2025-03-27 00:00:00
541689 | | WAGNER METRO 2025 | Off Premises | 2025-04-12 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | MELVILLE WINE & SPIRITS | 888 WALT WHITMAN RD | MELVILLE | NEW YORK | 11747 | (631) 470-4779 | | Long Island | Nassau | Susan Laudani-Stolfi | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum Red, Sea Sun Pinot Noir, Mer Soleil Silver Chardonnay, Emmolo Sauvignon Blanc | 13 | 14 | 56492 | | 1318827 | Leah Guidarelli | 2025-03-28 00:00:00
542975 | | WAGNER METRO 2025 | Off Premises | 2025-04-12 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | HOUDEK'S WINES & LIQUORS | 844 MONTAUK HWY | BAYPORT | NEW YORK | 11705 | (631) 472-1300 | | Long Island | Suffolk | Victoria Rodriquez | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Caymus-Suisan Walking Fool Red, Caymus-Suisan Grand Durif | 4 | 22 | 1538 | 1410841 | 1045947 | Leah Guidarelli | 2025-04-07 00:00:00
541522 | | WAGNER METRO 2025 | Off Premises | 2025-04-13 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | ALEX'S DISCOUNT/ DAVE'S DISCOUNT LIQ&WINE | 1645 86TH STREET | BROOKLYN | NEW YORK | 11214 | (718) 234-9399 | | Metro | Brooklyn | Arin Cacciolo | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus Vineyards Cabernet Sauvignon Napa Valley, Emmolo Sauvignon Blanc, Caymus-Suisan Walking Fool Red | 10 | 25 | 384 | 659947 | 1264683 | Leah Guidarelli | 2025-03-26 00:00:00
540377 | | WAGNER METRO 2025 | Off Premises | 2025-04-17 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | HB LIQUORS @ COSTCO | 20 STEW LEONARD DRIVE | YONKERS | NEW YORK | 10710 | (914) 375-9292 | | Long Island | Westchester | Daniel Cohen | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Mer Soleil Silver Chardonnay, Caymus Vineyards Cabernet Sauvignon California, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Caymus-Suisan Walking Fool Red | 8 | 14 | 22112 | 978469 | 1207364 | Leah Guidarelli | 2025-03-17 00:00:00
543065 | | WAGNER METRO 2025 | Off Premises | 2025-04-17 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | GARDEN CITY DISCOUNT (BJ'S) | 711 STEWART AVE | GARDEN CITY | NEW YORK | 11530 | (516) 228-9463 | | Long Island | Nassau | Nancy Rico | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Caymus Vineyards Cabernet Sauvignon California, Mer Soleil Chardonnay Reserve Monterey, Conundrum White, Conundrum Red | 7 | 12 | 40963 | | 1268275 | Leah Guidarelli | 2025-04-07 00:00:00
539874 | | WAGNER METRO 2025 | Off Premises | 2025-04-18 00:00:00 | 14:00:00 | 17:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | K H & H/LONG ISLAND CITY LIQ | 3250 VERNON BLVD | LONG ISLAND CITY | NEW YORK | 11106 | (718) 267-2992 | | Metro | Queens | Mary Scocozza | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum Red, Caymus-Suisan Walking Fool Red, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Sea Sun Pinot Noir, Caymus Vineyards Cabernet Sauvignon California, Mer Soleil Santa Lucia Highlands Reserve Chardonnay | 34 | 45 | 17009 | 2042240 | 1166978 | Leah Guidarelli | 2025-03-12 00:00:00
542375 | | WAGNER METRO 2025 | Off Premises | 2025-04-18 00:00:00 | 15:00:00 | 18:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | POST W&L | 510 JERICHO TPK | SYOSSET | NEW YORK | 11791 | (516) 921-1820 | | Long Island | Nassau | Elliot Setton | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Conundrum Red, Mer Soleil Silver Chardonnay, Conundrum White, Caymus Vineyards Cabernet Sauvignon California | 10 | 15 | 38248 | 1427857 | 1260156 | Leah Guidarelli | 2025-04-02 00:00:00
542566 | | WAGNER METRO 2025 | Off Premises | 2025-04-18 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | EXECUTIVE WINE & SPIRITS | 1086 N BROADWAY | YONKERS | NEW YORK | 10701 | (917) 226-7000 | | Long Island | Westchester | Giselle Cruz | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Conundrum Red, Caymus Vineyards Cabernet Sauvignon California, Emmolo Sauvignon Blanc | 10 | 28 | 52809 | | 1302676 | Leah Guidarelli | 2025-04-03 00:00:00
543072 | | WAGNER UNY OFF 2025 | Off Premises | 2025-04-18 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | CHM LIQUORS (COSTCO) | 345 WESTFALL RD | ROCHESTER | NEW YORK | 14620 | (585) 292-0007 | | Rochester | | Christine Miller | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Caymus-Suisan Walking Fool Red, Conundrum White, Conundrum Red, Caymus California Paso Robles Cabernet Sauvignon | 17 | 30 | 52983 | | 3160519 | Jadyn Siuta | 2025-04-07 00:00:00
543810 | | WAGNER METRO 2025 | Off Premises | 2025-04-19 00:00:00 | 12:00:00 | 15:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | HOLBROOK LIQUORS/BECKENDORF | 125 BEACON DRIVE | HOLBROOK | NEW YORK | 11741 | (631) 563-3515 | | Long Island | Suffolk | Brianne Garbett | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Sea Sun Chardonnay, Sea Sun Pinot Noir, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Caymus Vineyards Cabernet Sauvignon California | 16 | 95 | 11235 | 1623549 | 1116039 | Leah Guidarelli | 2025-04-11 00:00:00
535797 | | WAGNER UNY OFF 2025 | Off Premises | 2025-04-19 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | DEPOT WINE & LIQUORS | 100 INDEPENDENT WAY | BREWSTER | NEW YORK | 10509 | (845) 279-0112 | | Hudson Valley/Rockland | | Jeremy Holiday | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus Vineyards Cabernet Sauvignon California, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Sea Sun Chardonnay, Sea Sun Pinot Noir, Conundrum Red | 12 | 19 | 41731 | 1878375 | 2191466 | Kimberly Danielewicz | 2025-02-12 00:00:00
536584 | | WAGNER METRO 2025 | Off Premises | 2025-04-19 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | WESTBURY LIQUORS | 1250 OLD COUNTRY RD | WESTBURY | NEW YORK | 11590 | (516) 832-8602 | | Long Island | Nassau | Frank DiGregorio | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Sea Sun Chardonnay, Conundrum Red, Caymus Vineyards Cabernet Sauvignon California | 9 | 19 | 11234 | 1410770 | 1117174 | Leah Guidarelli | 2025-02-19 00:00:00
541326 | | WAGNER METRO 2025 | Off Premises | 2025-04-19 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | ACES WINE & SPIRITS | 1811 MERRICK AVE N | MERRICK | NEW YORK | 11566 | (516) 379-3090 | | Long Island | Nassau | Susanne Igneri | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum White, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Mer Soleil Silver Chardonnay, Caymus Vineyards Cabernet Sauvignon California | 4 | 24 | 1495 | 1409080 | 1015900 | Jodi Brooks | 2025-03-25 00:00:00
540414 | | WAGNER METRO 2025 | Off Premises | 2025-04-19 00:00:00 | 15:00:00 | 18:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | EAST CHELSEA SPIRITS INC / LIQUOR UP & WINE DOWN | 383 FIRST AVE | NEW YORK | NEW YORK | 10010 | (646) 964-4173 | | Metro | New York | Pamela Grace | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Sea Sun Chardonnay, Sea Sun Pinot Noir, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7 | 14 | 17 | 53548 | 762812 | 1308045 | Leah Guidarelli | 2025-03-17 00:00:00
541521 | | WAGNER METRO 2025 | Off Premises | 2025-04-19 00:00:00 | 15:00:00 | 18:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | PEPPINOS LIQUORS & WINES | 7723 3RD AVE | BROOKLYN | NEW YORK | 11209 | (347) 517-4706 | | Metro | Brooklyn | Adele Ofman | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Emmolo Sauvignon Blanc, Emmolo Merlot | 15 | 58 | 49143 | | 1292491 | Leah Guidarelli | 2025-03-26 00:00:00
542370 | | WAGNER METRO 2025 | Off Premises | 2025-04-19 00:00:00 | 15:00:00 | 18:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | LAKE SUCCESS WINE AND SPIRIT | 1560 UNION TPKE | NEW HYDE PARK | NEW YORK | 11040 | (516) 216-5437 | | Long Island | Nassau | Peggy Delucia-Grace | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Sea Sun Chardonnay, Caymus Vineyards Cabernet Sauvignon California, Sea Sun Pinot Noir, Conundrum White | 9 | 15 | 49485 | | 1296093 | Leah Guidarelli | 2025-04-02 00:00:00
538971 | | WAGNER UNY OFF 2025 | Off Premises | 2025-04-19 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | CLINTON WINE & SPIRITS | 43 MEADOW STREET SPACE 2 | CLINTON | NEW YORK | | (315) 859-1245 | | Syracuse | | Katelynn Hunt | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Sea Sun Pinot Noir, Conundrum White, Conundrum Red, Emmolo Sauvignon Blanc | 3 | 30 | 12305 | 5537218 | 2158929 | Kimberly Danielewicz | 2025-03-06 00:00:00
540157 | | WAGNER METRO 2025 | Off Premises | 2025-04-19 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | PRICE RITE | 689 OLD COUNTRY RD | DIX HILLS | NEW YORK | 11746 | (631) 549-8899 | | Long Island | Suffolk | Helena Diringerova | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum Red, Conundrum White, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Sea Sun Chardonnay | 9 | 25 | 1382 | 1410403 | 1146347 | Leah Guidarelli | 2025-03-16 00:00:00
543745 | | WAGNER METRO 2025 | Off Premises | 2025-04-19 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | PARK SLOPE WINE AND LIQUOR INC | 539 541 5TH AVENUE | BROOKLYN | NEW YORK | 11215 | (718) 768-5402 | | Metro | Brooklyn | Jalynn White | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Caymus Vineyards Cabernet Sauvignon California, Conundrum Red | 3 | 15 | 44977 | 1409183 | 1281750 | Leah Guidarelli | 2025-04-11 00:00:00
542836 | | WAGNER UNY OFF 2025 | Off Premises | 2025-04-25 00:00:00 | 15:00:00 | 18:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | WHITEHOUSE LIQ STORE (WEGMANS) | 650 HYLAN DR | ROCHESTER | NEW YORK | | (585) 473-4049 | | Rochester | | Christine Miller | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Conundrum Red, Caymus California Paso Robles Cabernet Sauvignon | 1 | 11 | 11568 | 1410781 | 00003009723 | Jadyn Siuta | 2025-04-04 00:00:00
543066 | | WAGNER METRO 2025 | Off Premises | 2025-04-25 00:00:00 | 15:00:00 | 18:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | WHEATLEY HILLS DISC. LIQ | 193 POST AVE. | WESTBURY | NEW YORK | 11590 | (516) 333-1110 | | Long Island | Nassau | Staci Rosen | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Caymus Vineyards Cabernet Sauvignon California, Mer Soleil Chardonnay Reserve Monterey, Conundrum Red, Emmolo Sauvignon Blanc | 8 | 13 | 63888 | 1410777 | 1015942 | Leah Guidarelli | 2025-04-07 00:00:00
543746 | | WAGNER METRO 2025 | Off Premises | 2025-04-25 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | Y & Q LIQUORS | 225 HILLSIDE AVE | WILLISTON PARK | NEW YORK | 11596 | (516) 746-2680 | | Long Island | Nassau | Diana Cervi Suppa | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum White, Conundrum Red | 3 | 19 | 1428 | 1485502 | 1015945 | Leah Guidarelli | 2025-04-11 00:00:00
543463 | | WAGNER METRO 2025 | Off Premises | 2025-04-25 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | FLUSHING WINE & LIQUOR | 59 04 MAIN ST | FLUSHING | NEW YORK | | | | Metro | Queens | Sheila Jean-Baptiste | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Caymus Vineyards Cabernet Sauvignon California, Sea Sun Pinot Noir | 2 | 10 | 23565 | 1410046 | | Leah Guidarelli | 2025-04-09 00:00:00
543809 | | WAGNER METRO 2025 | Off Premises | 2025-04-26 00:00:00 | 12:00:00 | 15:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | HOLBROOK LIQUORS/BECKENDORF | 125 BEACON DRIVE | HOLBROOK | NEW YORK | 11741 | (631) 563-3515 | | Long Island | Suffolk | Jilliane Amato | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Sea Sun Chardonnay, Sea Sun Pinot Noir, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Caymus Vineyards Cabernet Sauvignon California | 18 | 40 | 11235 | 1623549 | 1116039 | Leah Guidarelli | 2025-04-11 00:00:00
542360 | | WAGNER METRO 2025 | Off Premises | 2025-04-26 00:00:00 | 12:30:00 | 15:30:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | JERICHO WINES AND LIQUORS (GARDEN CITY) | 2335 JERICHO TPKE | NEW HYDE PARK | NEW YORK | 11040 | (516) 747-0599 | | Long Island | Nassau | Angela DeMauro | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum Red, Conundrum White, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Mer Soleil Silver Chardonnay | 4 | 14 | 15168 | 1427692 | 1166351 | Leah Guidarelli | 2025-04-02 00:00:00
540503 | | WAGNER METRO 2025 | Off Premises | 2025-04-26 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | STEW LEONARD'S / VINEYARDS OF FARMINGDALE | 210 AIRPORT PLAZA | FARMINGDALE | NEW YORK | 11735 | (631) 249-3611 | | Long Island | Suffolk | Jessica Bohn | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum White, Conundrum Red, Emmolo Sauvignon Blanc, Emmolo Merlot, Caymus Vineyards Cabernet Sauvignon California | 16 | 24 | 1777 | 1732052 | 1127678 | Leah Guidarelli | 2025-03-18 00:00:00
540745 | | WAGNER UNY OFF 2025 | Off Premises | 2025-04-26 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | HELLER'S SS&P WINE & LIQUOR WAREHOUSE | 3701 NY HWY 43 | WEST SAND LAKE | NEW YORK | 12196 | (518) 674-6196 | | North Albany | | Laura Edick | 1 | 238 | 0 | 0 | 0 | 0 | 3.55 | 0 | 241.55 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Sea Sun Pinot Noir, Red Schooner Transit 3, Red Schooner Voyage 12, Mer Soleil Chardonnay Reserve | 6 | 30 | 57819 | | 2168362 | Natasha Fiato | 2025-03-20 00:00:00
542837 | | WAGNER UNY OFF 2025 | Off Premises | 2025-04-26 00:00:00 | 15:00:00 | 18:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | CHILI LIQUOR STORE | 3218 CHILI AVE | ROCHESTER | NEW YORK | | (585) 889-2660 | | Rochester | | Kim DeNoto | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Conundrum Red, Caymus California Paso Robles Cabernet Sauvignon, Mer Soleil Chardonnay Reserve | 8 | 21 | 11687 | 1409362 | 3009755 | Jadyn Siuta | 2025-04-04 00:00:00
544729 | | WAGNER METRO 2025 | Off Premises | 2025-04-26 00:00:00 | 15:00:00 | 18:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | COVES DISCOUNT LIQUORS | 270 GLEN COVE AVE. | GLEN COVE | NEW YORK | 11542 | (516) 671-5573 | | Long Island | Nassau | Heather Poster | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum White, Conundrum Red, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Caymus Vineyards Cabernet Sauvignon California, Sea Sun Pinot Noir | 9 | 18 | 37365 | | 1256981 | Leah Guidarelli | 2025-04-21 00:00:00
543025 | | WAGNER METRO 2025 | Off Premises | 2025-04-26 00:00:00 | 15:30:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | PJ'S (UPTOWN) | 4898 BROADWAY | NEW YORK | NEW YORK | 10034 | (212) 567-5500 | | Metro | New York | Natalie Quinones | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum Red, Caymus Vineyards Cabernet Sauvignon California | 7 | 28 | 398 | 1410318 | 1023806 | Leah Guidarelli | 2025-04-07 00:00:00
540158 | | WAGNER METRO 2025 | Off Premises | 2025-04-26 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | PRICE RITE | 689 OLD COUNTRY RD | DIX HILLS | NEW YORK | 11746 | (631) 549-8899 | | Long Island | Suffolk | Helena Diringerova | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum Red, Conundrum White, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Sea Sun Chardonnay | 9 | 18 | 1382 | 1410403 | 1146347 | Leah Guidarelli | 2025-03-16 00:00:00
544154 | | WAGNER METRO 2025 | Off Premises | 2025-04-26 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | GRACE WINE & SPIRITS INC | 610 TENTH AVE | NEW YORK | NEW YORK | 10036 | (212) 202-0776 | | Metro | New York | Pamela Grace | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Sea Sun Chardonnay, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Caymus Vineyards Cabernet Sauvignon California | 11 | 25 | 22882 | 3663517 | 1220827 | Leah Guidarelli | 2025-04-14 00:00:00
544446 | | WAGNER METRO 2025 | Off Premises | 2025-04-26 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | ACE BUY RITE | 85 10 GRAND AVE | ELMHURST | NEW YORK | 11373 | (718) 426-3980 | | Metro | Queens | Jacqueline Grant | 1 | 238 | 0 | 0 | 0 | 0 | 2.5 | 0 | 240.5 | Emmolo Sauvignon Blanc, Mer Soleil Chardonnay Reserve Monterey, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Caymus-Suisan Walking Fool Red | 10 | 14 | 46943 | | 1288072 | Leah Guidarelli | 2025-04-17 00:00:00
544834 | | \*\*\***SGWS SIGNATURE DIVISION PORTFOLIO EVENT\*\*** WAGNER | On Premises | 2025-04-28 00:00:00 | 13:00:00 | 18:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | HOTEL BROOKMERE & ARBOR SPA | 500 UNION AVE | SARATOGA SPRINGS | NEW YORK | | | | North Albany | | Robert Adams | 1 | 396 | 0 | 0 | 0 | 0 | 0 | 0 | 396 | | 0 | 100 | 12350 | 5096656 | | Leah Guidarelli | 2025-04-22 00:00:00
543110 | | WAGNER UNY OFF 2025 | Off Premises | 2025-05-09 00:00:00 | 14:00:00 | 17:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | LAKSH LIQUOR CORPS / CONSUMER'S DISCOUNT | 88 20 DUNNING RD | MIDDLETOWN | NEW YORK | 10940 | (845) 344-2200 | | Hudson Valley/Rockland | | Darcilla Madden | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Conundrum Red, Emmolo Sauvignon Blanc, Conundrum White, Caymus Vineyards Cabernet Sauvignon California | 4 | 15 | 51218 | 1785422 | 2208014 | Jadyn Siuta | 2025-04-08 00:00:00
545415 | | WAGNER UNY OFF 2025 | Off Premises | 2025-05-09 00:00:00 | 15:00:00 | 18:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | EASTWAY LIQUOR | 1217 BAY ROAD | WEBSTER | NEW YORK | | (585) 671-4594 | | Rochester | | Ellen Muto | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus-Suisan Walking Fool Red, Mer Soleil Chardonnay Reserve Monterey, Conundrum White, Caymus Vineyards Cabernet Sauvignon California, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7 | 10 | 26 | 12215 | 1409560 | | Kimberly Danielewicz | 2025-04-25 00:00:00
545824 | | WAGNER UNY OFF 2025 | Off Premises | 2025-05-09 00:00:00 | 15:00:00 | 18:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | WEBSTER WINE & SPIRITS (960 RIDGE RD, #12288) | 960 RIDGE RD | WEBSTER | NEW YORK | | (585) 671-1686 | | Rochester | | Anne Lambert | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Mer Soleil Chardonnay Reserve Monterey, Caymus Vineyards Cabernet Sauvignon California, Sea Sun Pinot Noir | 6 | 25 | 12288 | 1428095 | 3009671 | Kimberly Danielewicz | 2025-04-29 00:00:00
540415 | | WAGNER METRO 2025 | Off Premises | 2025-05-09 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | EAST CHELSEA SPIRITS INC / LIQUOR UP & WINE DOWN | 383 FIRST AVE | NEW YORK | NEW YORK | 10010 | (646) 964-4173 | | Metro | New York | Zipporah Arthur | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Sea Sun Chardonnay, Sea Sun Pinot Noir, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7 | 5 | 40 | 53548 | 762812 | 1308045 | Leah Guidarelli | 2025-03-17 00:00:00
543984 | | WAGNER METRO 2025 | Off Premises | 2025-05-09 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | PRICE RITE | 689 OLD COUNTRY RD | DIX HILLS | NEW YORK | 11746 | (631) 549-8899 | | Long Island | Suffolk | Karen Liu | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Sea Sun Chardonnay, Conundrum White, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Caymus Vineyards Cabernet Sauvignon California, Conundrum Red | 10 | 16 | 1382 | 1410403 | 1146347 | Leah Guidarelli | 2025-04-12 00:00:00
545588 | | WAGNER METRO 2025 | Off Premises | 2025-05-09 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | BEDVYNE WINES & SPIRITS | 385 TOMKINS AVE | BROOKLYN | NEW YORK | | (347) 915-1080 | | Metro | Brooklyn | Iris Fels | 1 | 238 | 0 | 0 | 0 | 0 | 3 | 0 | 241 | Conundrum White, Mer Soleil Chardonnay Reserve Monterey, Emmolo Sauvignon Blanc | 13 | 23 | | | | Leah Guidarelli | 2025-04-26 00:00:00
541499 | | WAGNER METRO 2025 | Off Premises | 2025-05-09 00:00:00 | 18:00:00 | 21:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | GREENPOINT WINE & LI | 89 NASSAU AVE | BROOKLYN | NEW YORK | 11222 | (718) 383-3131 | | Metro | Brooklyn | Bobby Thomas | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Mer Soleil Santa Lucia Highlands Reserve Chardonnay, Mer Soleil Silver Chardonnay, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Conundrum White, Conundrum Red | 7 | 23 | 1109 | 1409712 | 1011515 | Leah Guidarelli | 2025-03-26 00:00:00
542363 | | WAGNER METRO 2025 | Off Premises | 2025-05-10 00:00:00 | 12:00:00 | 15:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | WESTBURY LIQUORS | 1250 OLD COUNTRY RD | WESTBURY | NEW YORK | 11590 | (516) 832-8602 | | Long Island | Nassau | Tonica Jenkins | 1 | 238 | 0 | 0 | 0 | 0 | 4.51 | 0 | 242.51 | Conundrum Red, Caymus Vineyards Cabernet Sauvignon California, Sea Sun Chardonnay, Sea Sun Pinot Noir | 11 | 27 | 11234 | 1410770 | 1117174 | Leah Guidarelli | 2025-04-02 00:00:00
545823 | | WAGNER UNY OFF 2025 | Off Premises | 2025-05-10 00:00:00 | 12:00:00 | 15:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | LIQUOR BOX (3670 MT READ BLVD) | 3670 MT READ BLVD | ROCHESTER | NEW YORK | | (585) 448-1998 | | Rochester | | Kathy Schoepfel- Church | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum White, Conundrum Red, Sea Sun Chardonnay, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7 | 4 | 30 | 52313 | 1998896 | 3009714 | Kimberly Danielewicz | 2025-04-29 00:00:00
544783 | | WAGNER METRO 2025 | Off Premises | 2025-05-10 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | ELMSFORD WINE & LIQUORS (MAIN ST) | 111 E MAIN ST | ELMSFORD | NEW YORK | 10523 | (914) 909-4760 | | Long Island | Westchester | Adaira Marie Greco | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Sea Sun Chardonnay, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Caymus Vineyards Cabernet Sauvignon California | 16 | 35 | 54251 | | 1312770 | Leah Guidarelli | 2025-04-21 00:00:00
545773 | | WAGNER METRO 2025 (CANCELLED UPON ARRIVAL) | Off Premises | 2025-05-10 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | POPE LIQUORS, INC. | 2799 D.RTE.112 | MEDFORD | NEW YORK | 11763 | (631) 289-1660 | | Long Island | Suffolk | Jilliane Amato | 1 | 119 | 0 | 0 | 0 | 0 | 0 | 0 | 119 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Caymus Vineyards Cabernet Sauvignon California, Emmolo Sauvignon Blanc | 0 | 0 | 1557 | 1410336 | 1046069 | Leah Guidarelli | 2025-04-29 00:00:00
546053 | | WAGNER UNY OFF 2025 | Off Premises | 2025-05-10 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | PITTSFORD CENTURY WINES & (WEGMANS) | 3349 MONROE AVE #55 | ROCHESTER | NEW YORK | 14618 | (585) 248-0931 | | Rochester | | Melinda Goldberg | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Sea Sun Chardonnay, Conundrum Red, Conundrum White, Caymus Vineyards Cabernet Sauvignon California, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7 | 21 | 15 | 3458 | 2199578 | 3135403 | Kimberly Danielewicz | 2025-04-30 00:00:00
544246 | | WAGNER METRO 2025 | Off Premises | 2025-05-10 00:00:00 | 14:00:00 | 17:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | OAKDALE W & L BUSTER | 949D MONTAUK HWY | OAKDALE | NEW YORK | 11769 | (631) 567-1603 | | Long Island | Suffolk | Nicole Benincasa | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus-Suisan Walking Fool Red, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Caymus Vineyards Cabernet Sauvignon California, Mer Soleil Chardonnay Reserve Monterey | 22 | 21 | 1316 | 1427797 | 1144571 | Leah Guidarelli | 2025-04-15 00:00:00
541327 | | WAGNER METRO 2025 | Off Premises | 2025-05-10 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | ACES WINE & SPIRITS | 1811 MERRICK AVE N | MERRICK | NEW YORK | 11566 | (516) 379-3090 | | Long Island | Nassau | Stacy Del Ponte | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum White, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Mer Soleil Silver Chardonnay, Sea Sun Pinot Noir | 10 | 21 | 1495 | 1409080 | 1015900 | Jodi Brooks | 2025-03-25 00:00:00
541325 | | WAGNER METRO 2025 | Off Premises | 2025-05-10 00:00:00 | 16:30:00 | 19:30:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | LIDO WINE & SPIRITS | 641 E PARK AVE | LONG BEACH | NEW YORK | 11561 | (516) 431-1113 | | Long Island | Nassau | Robin Linderman | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum Red, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Mer Soleil Chardonnay Reserve Monterey | 2 | 16 | 38066 | | 1257760 | Jodi Brooks | 2025-03-25 00:00:00
545932 | | WAGNER METRO 2025 | Off Premises | 2025-05-10 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | RALPHIES LIQUOR & WINE INC | 1988 RALPH AVE | BROOKLYN | NEW YORK | 11234 | (631) 953-5275 | | Metro | Brooklyn | Anna Gleyzerman | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum White, Conundrum Red, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7 | 37 | 70 | 63180 | | 6020943 | Leah Guidarelli | 2025-04-29 00:00:00
545075 | | WAGNER METRO 2025 | Off Premises | 2025-05-11 00:00:00 | 11:00:00 | 14:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | CROSSROADS W & L | 808 C HICKSVILLE RD. | MASSAPEQUA | NEW YORK | 11758 | (516) 797-7760 | | Long Island | Nassau | Dianna Amini | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum Red, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Caymus Vineyards Cabernet Sauvignon California, Emmolo Sauvignon Blanc | 2 | 20 | 238 | 1409463 | 1015993 | Leah Guidarelli | 2025-04-23 00:00:00
546851 | | WAGNER METRO 2025 | Off Premises | 2025-05-16 00:00:00 | 12:00:00 | 15:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | BAYSHORE DISCOUNT LIQUOR INC | 567 E MAIN ST | BAYSHORE | NEW YORK | 11706 | | | Long Island | Suffolk | Mary Infante | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Conundrum Red, Conundrum White, Caymus-Suisan Walking Fool Red | 5 | 12 | 65850 | | 6054695 | Leah Guidarelli | 2025-05-06 00:00:00
542567 | | WAGNER METRO 2025 | Off Premises | 2025-05-16 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | EXECUTIVE WINE & SPIRITS | 1086 N BROADWAY | YONKERS | NEW YORK | 10701 | (917) 226-7000 | | Long Island | Westchester | Giselle Cruz | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Conundrum Red, Caymus Vineyards Cabernet Sauvignon California, Emmolo Sauvignon Blanc | 6 | 18 | 52809 | | 1302676 | Leah Guidarelli | 2025-04-03 00:00:00
543412 | | WAGNER UNY OFF 2025 | Off Premises | 2025-05-16 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | STAR WINE & LIQUOR (MONROE) | 475 ROUTE 17M | MONROE | NEW YORK | 10950 | (845) 782-5460 | | Hudson Valley/Rockland | | Jeniffer Stewart | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Conundrum Red, Emmolo Sauvignon Blanc, Caymus Vineyards Cabernet Sauvignon California, Mer Soleil Chardonnay Reserve Monterey | 11 | 60 | 63087 | 1581250 | 6004858 | Kimberly Danielewicz | 2025-04-09 00:00:00
547063 | | WAGNER METRO 2025 | Off Premises | 2025-05-16 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | ALLSTAR W&L | 248-12 NORTHERN BLVD | LITTLE NECK | NEW YORK | 11362 | (718) 819-0388 | | Metro | Queens | Laura David | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum Red, Conundrum White, Red Schooner Transit 2, Sea Sun Pinot Noir, Emmolo Sauvignon Blanc, Mer Soleil Chardonnay Reserve | 4 | 10 | 44486 | | 1257485 | Leah Guidarelli | 2025-05-07 00:00:00
545656 | | WAGNER METRO 2025 | Off Premises | 2025-05-17 00:00:00 | 12:00:00 | 15:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | FAIRWAY W & S | 847A PELHAM PKWY | PELHAM MANOR | NEW YORK | 10803 | (718) 569-4545 | | Long Island | Westchester | Camilla Ivy | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | | 10 | 25 | 56512 | | 1232362 | Leah Guidarelli | 2025-04-28 00:00:00
545964 | | WAGNER METRO 2025 | Off Premises | 2025-05-22 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | WHEATLEY HILLS DISC. LIQ | 193 POST AVE. | WESTBURY | NEW YORK | 11590 | (516) 333-1110 | | Long Island | Nassau | Janice Segure | 1 | 238 | 0 | 0 | 0 | 0 | 4.33 | 0 | 242.33 | Conundrum White, Conundrum Red, Caymus-Suisan Walking Fool Red, Caymus Vineyards Cabernet Sauvignon California, Mer Soleil Silver Chardonnay | 1 | 40 | 63888 | 1410777 | 1015942 | Leah Guidarelli | 2025-04-29 00:00:00
546021 | | WAGNER METRO 2025 | Off Premises | 2025-05-23 00:00:00 | 15:30:00 | 18:30:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | FUJIAN LIQUOR PLAZA | 133 WALT WHITMAN RD | HUNTINGTON STATION | NEW YORK | 11746 | (631) 271-0004 | | Long Island | Nassau | Dianna Amini | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum White, Conundrum Red, Mer Soleil Chardonnay Reserve Monterey, Caymus Vineyards Cabernet Sauvignon California | 5 | 15 | 29208 | | 1243640 | Leah Guidarelli | 2025-04-30 00:00:00
543073 | | WAGNER UNY OFF 2025 | Off Premises | 2025-05-23 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | CHM LIQUORS (COSTCO) | 345 WESTFALL RD | ROCHESTER | NEW YORK | 14620 | (585) 292-0007 | | Rochester | | Bernadette Rizzo | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Caymus-Suisan Walking Fool Red, Conundrum White, Conundrum Red, Caymus California Paso Robles Cabernet Sauvignon | 6 | 14 | 52983 | | 3160519 | Jadyn Siuta | 2025-04-07 00:00:00
543985 | | WAGNER METRO 2025 | Off Premises | 2025-05-23 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | PRICE RITE | 689 OLD COUNTRY RD | DIX HILLS | NEW YORK | 11746 | (631) 549-8899 | | Long Island | Suffolk | Karen Liu | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Sea Sun Chardonnay, Conundrum White, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Caymus Vineyards Cabernet Sauvignon California, Conundrum Red | 6 | 15 | 1382 | 1410403 | 1146347 | Leah Guidarelli | 2025-04-12 00:00:00
545589 | | WAGNER METRO 2025 | Off Premises | 2025-05-23 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | BEDVYNE WINES & SPIRITS | 385 TOMKINS AVE | BROOKLYN | NEW YORK | | (347) 915-1080 | | Metro | Brooklyn | Bobby Thomas | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum White, Mer Soleil Chardonnay Reserve Monterey, Emmolo Sauvignon Blanc | 12 | 39 | | | | Leah Guidarelli | 2025-04-26 00:00:00
541500 | | WAGNER METRO 2025 | Off Premises | 2025-05-23 00:00:00 | 18:00:00 | 21:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | GREENPOINT WINE & LI | 89 NASSAU AVE | BROOKLYN | NEW YORK | 11222 | (718) 383-3131 | | Metro | Brooklyn | Shannon Barnes | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus-Suisan Walking Fool Red, Caymus-Suisan Grand Durif, Sea Sun Pinot Noir | 2 | 21 | 1109 | 1409712 | 1011515 | Leah Guidarelli | 2025-03-26 00:00:00
545775 | | WAGNER METRO 2025 | Off Premises | 2025-05-24 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | HB LIQUORS @ COSTCO | 20 STEW LEONARD DRIVE | YONKERS | NEW YORK | 10710 | (914) 375-9292 | | Long Island | Westchester | Camilla Ivy | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus Vineyards Cabernet Sauvignon Napa Valley, Caymus-Suisan Walking Fool Red, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Mer Soleil Silver Chardonnay, Caymus Vineyards Cabernet Sauvignon California | 18 | 28 | 22112 | 978469 | 1207364 | Leah Guidarelli | 2025-04-29 00:00:00
547810 | | WAGNER METRO 2025 | Off Premises | 2025-05-24 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | PEQUA SPIRITS CORP/WINE FACTORY | 5151 MERRICK ROAD | MASSAPEQUA PARK | NEW YORK | 11762 | (516) 795-3935 | | Long Island | Nassau | Elizabeth Kiel | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus-Suisan Walking Fool Red, Sea Sun Chardonnay, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Sea Sun Pinot Noir | 7 | 28 | 1579 | 2275322 | 1197423 | Leah Guidarelli | 2025-05-13 00:00:00
542361 | | WAGNER METRO 2025 | Off Premises | 2025-05-24 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | JERICHO WINES AND LIQUORS (GARDEN CITY) | 2335 JERICHO TPKE | NEW HYDE PARK | NEW YORK | 11040 | (516) 747-0599 | | Long Island | Nassau | Marti Peretzman | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum Red, Conundrum White, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Mer Soleil Silver Chardonnay | 7 | 22 | 15168 | 1427692 | 1166351 | Leah Guidarelli | 2025-04-02 00:00:00
548134 | | WAGNER METRO 2025 | Off Premises | 2025-05-24 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | NEW GOLDEN WINE & LIQUOR | 41 07 09 BELL BLVD | BAYSIDE | NEW YORK | 11361 | (718) 428-9463 | | Metro | Queens | Jenny Surujbali | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum White, Conundrum Red, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7 | 6 | 15 | 19331 | 1409689 | 1193856 | Leah Guidarelli | 2025-05-14 00:00:00
549623 | | WAGNER METRO 2025 | Off Premises | 2025-05-30 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | SWIFTWAY WINE & LIQUOR | 1604 ROUTE 112 | MEDFORD | NEW YORK | 11763 | (631) 654-8000 | | Long Island | Suffolk | Cindy DeMasi | 1 | 238 | 0 | 0 | 0 | 0 | 2.49 | 0 | 240.49 | Conundrum White, Sea Sun Pinot Noir, Caymus-Suisan Walking Fool Red, Sea Sun Chardonnay | 5 | 26 | 1819 | 1410618 | 1150730 | Leah Guidarelli | 2025-05-22 00:00:00
545774 | | WAGNER METRO 2025 | Off Premises | 2025-05-30 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | POPS LIQUOR | 256 LONG BEACH RD | ISLAND PARK | NEW YORK | 11558 | (516) 431-0025 | | Long Island | Nassau | Kimberly Carlstrom | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Sea Sun Pinot Noir, Caymus-Suisan Walking Fool Red, Mer Soleil Silver Chardonnay | 11 | 35 | 53909 | 1427852 | 1313303 | Leah Guidarelli | 2025-04-29 00:00:00
546214 | | WAGNER METRO 2025 | Off Premises | 2025-05-30 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | GILBERTS LIQUORS | 1160 MERRICK AVE N | MERRICK | NEW YORK | 11566 | (516) 489-4677 | | Long Island | Nassau | Michelle Jacobs | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Conundrum Red, Mer Soleil Silver Chardonnay, Caymus Vineyards Cabernet Sauvignon California | 4 | 14 | 1516 | 1999729 | 1015898 | Leah Guidarelli | 2025-05-01 00:00:00
548135 | | WAGNER METRO 2025 | Off Premises | 2025-06-01 00:00:00 | 14:00:00 | 17:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | PRICE RITE | 689 OLD COUNTRY RD | DIX HILLS | NEW YORK | 11746 | (631) 549-8899 | | Long Island | Suffolk | Helena Diringerova | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum White, Conundrum Red, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Sea Sun Chardonnay, Caymus Vineyards Cabernet Sauvignon California | 17 | 20 | 1382 | 1410403 | 1146347 | Leah Guidarelli | 2025-05-14 00:00:00
547603 | | WAGNER METRO 2025 | Off Premises | 2025-06-06 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | POPS LIQUOR | 256 LONG BEACH RD | ISLAND PARK | NEW YORK | 11558 | (516) 431-0025 | | Long Island | Nassau | Kimberly Carlstrom | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Caymus Vineyards Cabernet Sauvignon California, Emmolo Sauvignon Blanc | 9 | 35 | 53909 | 1427852 | 1313303 | Leah Guidarelli | 2025-05-12 00:00:00
551085 | | WAGNER METRO 2025 | Off Premises | 2025-06-12 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | EHP LIQUOR/COSTCO RIVERHEAD | 1774 OLD COUNTRY RD | RIVERHEAD | NEW YORK | 11901 | (631) 208-8800 | | Long Island | Suffolk | Leslie Rossi | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Conundrum Red, Conundrum White, Caymus Vineyards Cabernet Sauvignon California | 23 | 40 | 43764 | | 1272115 | Leah Guidarelli | 2025-06-03 00:00:00
547064 | | WAGNER METRO 2025 | Off Premises | 2025-06-13 00:00:00 | 12:00:00 | 15:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | WINE CELLAR OF QUEENS (BJ'S) | 137-11 20TH AVE | COLLEGE POINT | NEW YORK | 11356 | (718) 358-9463 | | Metro | Queens | Nolga Batista | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus Vineyards Cabernet Sauvignon California, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Mer Soleil Santa Lucia Highlands Reserve Chardonnay | 15 | 32 | 30656 | | 1244549 | Leah Guidarelli | 2025-05-07 00:00:00
547060 | | WAGNER METRO 2025 | Off Premises | 2025-06-13 00:00:00 | 14:00:00 | 17:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | BROADWAY LIQUORS & WINES WAREHOUSE | 5790 BROADWAY | BRONX | NEW YORK | 10463 | (347) 843-8329 | | Metro | Bronx | Dorothy kaufman | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus-Suisan Walking Fool Red, Conundrum White, Sea Sun Pinot Noir | 6 | 37 | 50730 | | 1296935 | Leah Guidarelli | 2025-05-07 00:00:00
547811 | | WAGNER METRO 2025 | Off Premises | 2025-06-13 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | PEQUA SPIRITS CORP/WINE FACTORY | 5151 MERRICK ROAD | MASSAPEQUA PARK | NEW YORK | 11762 | (516) 795-3935 | | Long Island | Nassau | Stacy Del Ponte | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus-Suisan Walking Fool Red, Conundrum White, Conundrum Red, Caymus Vineyards Cabernet Sauvignon California | 4 | 25 | 1579 | 2275322 | 1197423 | Leah Guidarelli | 2025-05-13 00:00:00
549939 | | WAGNER METRO 2025 | Off Premises | 2025-06-13 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | ALL SEASONS | 3333 CROMPOUND RD | YORKTOWN HEIGHTS | NEW YORK | 10598 | (914) 930-8845 | | Long Island | Westchester | Gia Minisolo | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Mer Soleil Silver Chardonnay, Emmolo Sauvignon Blanc, Mer Soleil Santa Lucia Highlands Reserve Chardonnay, Caymus Vineyards Cabernet Sauvignon California | 12 | 30 | 55684 | | 1316163 | Leah Guidarelli | 2025-05-27 00:00:00
551225 | | WAGNER METRO 2025 (CANCELLED UPON ARRIVAL) | Off Premises | 2025-06-13 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | WINE CITY | 4000 JERICHO TURNPIKE | EAST NORTHPORT | NEW YORK | 11731 | (631) 623-6092 | | Long Island | Suffolk | Dana Scacco | 1 | 119 | 0 | 0 | 0 | 0 | 0 | 0 | 119 | Emmolo Sauvignon Blanc, Sea Sun Pinot Noir, Conundrum White, Conundrum Red, Mer Soleil Silver Chardonnay | 0 | 0 | | | | Leah Guidarelli | 2025-06-04 00:00:00
551226 | | WAGNER METRO 2025 | Off Premises | 2025-06-13 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | MELVILLE WINE & SPIRITS | 888 WALT WHITMAN RD | MELVILLE | NEW YORK | 11747 | (631) 470-4779 | | Long Island | Nassau | Susanne Igneri | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Emmolo Sauvignon Blanc, Sea Sun Pinot Noir, Conundrum White, Conundrum Red, Mer Soleil Silver Chardonnay | 9 | 29 | 56492 | | 1318827 | Leah Guidarelli | 2025-06-04 00:00:00
551472 | | WAGNER METRO 2025 | Off Premises | 2025-06-13 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | HOLBROOK LIQUORS/BECKENDORF | 125 BEACON DRIVE | HOLBROOK | NEW YORK | 11741 | (631) 563-3515 | | Long Island | Suffolk | Donna Russo | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Mer Soleil Santa Lucia Highlands Reserve Chardonnay, Caymus Vineyards Cabernet Sauvignon California | 12 | 23 | 11235 | 1623549 | 1116039 | Leah Guidarelli | 2025-06-06 00:00:00
551655 | | WAGNER METRO 2025 | Off Premises | 2025-06-13 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | POST W&L | 510 JERICHO TPK | SYOSSET | NEW YORK | 11791 | (516) 921-1820 | | Long Island | Nassau | Heather Poster | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Emmolo Sauvignon Blanc, Conundrum White, Mer Soleil Silver Chardonnay | 12 | 28 | 38248 | 1427857 | 1260156 | Leah Guidarelli | 2025-06-08 00:00:00
551850 | | WAGNER METRO 2025 | Off Premises | 2025-06-13 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | VERNON WINE & LIQUOR | 50 06 VERNON BLVD | LONG ISLAND CITY | NEW YORK | 11101 | (718) 784-5096 | | Metro | Queens | Samuel Murrell | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus Vineyards Cabernet Sauvignon California, Caymus-Suisan Grand Durif, Emmolo Sauvignon Blanc | 3 | 30 | 46883 | 1428068 | 1287410 | Leah Guidarelli | 2025-06-10 00:00:00
542364 | | WAGNER METRO 2025 | Off Premises | 2025-06-14 00:00:00 | 12:00:00 | 15:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | WESTBURY LIQUORS | 1250 OLD COUNTRY RD | WESTBURY | NEW YORK | 11590 | (516) 832-8602 | | Long Island | Nassau | Paige Pagano | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum Red, Caymus Vineyards Cabernet Sauvignon California, Caymus-Suisan Walking Fool Red, Conundrum White | 11 | 34 | 11234 | 1410770 | 1117174 | Leah Guidarelli | 2025-04-02 00:00:00
550949 | | WAGNER UNY OFF 2025 | Off Premises | 2025-06-14 00:00:00 | 12:00:00 | 15:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | PREMIUM WINE & SPIRITS (7980 TRANSIT RD) | 7980 TRANSIT RD | WILLIAMSVILLE | NEW YORK | 14221 | (716) 565-3020 | | Buffalo | | Anne Siminski | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum Red, Conundrum White, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Mer Soleil Chardonnay Reserve, Caymus Vineyards Cabernet Sauvignon California | 8 | 20 | 12337 | 1410349 | 3004110 | Kimberly Danielewicz | 2025-06-03 00:00:00
551656 | | WAGNER METRO 2025 | Off Premises | 2025-06-14 00:00:00 | 12:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | STEW LEONARDS (YONKERS) | 1 STEW LEONARD DRIVE,STORE 2 | YONKERS | NEW YORK | 10710 | (914) 375-4713 | | Long Island | Westchester | Paola Cedeno | 1 | 317 | 0 | 0 | 0 | 0 | 0 | 0 | 317 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Caymus Vineyards Cabernet Sauvignon California, Conundrum White, Mer Soleil Santa Lucia Highlands Reserve Chardonnay | 35 | 83 | 2449 | 1488058 | 1051208 | Leah Guidarelli | 2025-06-08 00:00:00
545076 | | WAGNER METRO 2025 | Off Premises | 2025-06-14 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | CROSSROADS W & L | 808 C HICKSVILLE RD. | MASSAPEQUA | NEW YORK | 11758 | (516) 797-7760 | | Long Island | Nassau | Cathy DiPietro | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Sea Sun Pinot Noir, Mer Soleil Santa Lucia Highlands Reserve Chardonnay, Caymus Vineyards Cabernet Sauvignon California, Emmolo Sauvignon Blanc | 12 | 50 | 238 | 1409463 | 1015993 | Leah Guidarelli | 2025-04-23 00:00:00
545776 | | WAGNER METRO 2025 | Off Premises | 2025-06-14 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | HB LIQUORS @ COSTCO | 20 STEW LEONARD DRIVE | YONKERS | NEW YORK | 10710 | (914) 375-9292 | | Long Island | Westchester | Daniel Cohen | 1 | 238 | 0 | 0 | 0 | 0 | 3.26 | 0 | 241.26 | Caymus Vineyards Cabernet Sauvignon Napa Valley, Caymus-Suisan Walking Fool Red, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Mer Soleil Silver Chardonnay, Caymus Vineyards Cabernet Sauvignon California | 10 | 20 | 22112 | 978469 | 1207364 | Leah Guidarelli | 2025-04-29 00:00:00
551470 | | WAGNER METRO 2025 | Off Premises | 2025-06-14 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | SI DISCOUNT / FOREST-BARD LIQUORS INC | 467 FOREST AVE | STATEN ISLAND | NEW YORK | 10301 | (718) 448-8700 | | Metro | Staten Island | Italia Cicero-Lai | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Emmolo Sauvignon Blanc, Mer Soleil Santa Lucia Highlands Reserve Chardonnay, Conundrum Red | 7 | 17 | 40841 | | 1268801 | Leah Guidarelli | 2025-06-06 00:00:00
551468 | | WAGNER METRO 2025 | Off Premises | 2025-06-15 00:00:00 | 12:00:00 | 15:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | CITY WINE CELLAR INC | 2295 RICHMOND AVE | STATEN ISLAND | NEW YORK | 10314 | (718) 494-1400 | | Metro | Staten Island | Myrka Veloz | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Emmolo Sauvignon Blanc, Mer Soleil Silver Chardonnay, Conundrum White | 2 | 15 | 59353 | | 1337148 | Leah Guidarelli | 2025-06-06 00:00:00
551086 | | WAGNER METRO 2025 | Off Premises | 2025-06-19 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | EHP LIQUOR/COSTCO RIVERHEAD | 1774 OLD COUNTRY RD | RIVERHEAD | NEW YORK | 11901 | (631) 208-8800 | | Long Island | Suffolk | Cindy DeMasi | 1 | 238 | 0 | 0 | 0 | 0 | 3.25 | 0 | 241.25 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Conundrum Red, Conundrum White, Caymus Vineyards Cabernet Sauvignon California | 11 | 29 | 43764 | | 1272115 | Leah Guidarelli | 2025-06-03 00:00:00
551853 | | WAGNER METRO 2025 | Off Premises | 2025-06-19 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | MORTON WILLIAMS (23RD ST) | 311 E 23RD STREET | NEW YORK | NEW YORK | | (212) 213-0021 | | Metro | New York | Crystallia Karl | 1 | 238 | 0 | 0 | 0 | 0 | 4.34 | 0 | 242.34 | Conundrum White, Emmolo Sauvignon Blanc, Caymus-Suisan Walking Fool Red | 2 | 8 | | | | Leah Guidarelli | 2025-06-10 00:00:00
551804 | | WAGNER METRO 2025 | Off Premises | 2025-06-19 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | D&M PRATT LIQUORS | 465 MYRTLE AVE | BROOKLYN | NEW YORK | | (718) 522-3470 | | Metro | Brooklyn | Nicole Daniel | 1 | 238 | 0 | 0 | 0 | 0 | 2 | 0 | 240 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Emmolo Sauvignon Blanc, Sea Sun Chardonnay | 9 | 26 | 23563 | | | Leah Guidarelli | 2025-06-09 00:00:00
542371 | | WAGNER METRO 2025 | Off Premises | 2025-06-20 00:00:00 | 15:00:00 | 18:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | LAKE SUCCESS WINE AND SPIRIT | 1560 UNION TPKE | NEW HYDE PARK | NEW YORK | 11040 | (516) 216-5437 | | Long Island | Nassau | Patricia Webber | 1 | 238 | 0 | 0 | 0 | 0 | 3 | 0 | 241 | Sea Sun Chardonnay, Caymus Vineyards Cabernet Sauvignon California, Sea Sun Pinot Noir, Conundrum White | 6 | 22 | 49485 | | 1296093 | Leah Guidarelli | 2025-04-02 00:00:00
552038 | | WAGNER METRO 2025 | Off Premises | 2025-06-20 00:00:00 | 15:00:00 | 18:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | K H & H/LONG ISLAND CITY LIQ | 3250 VERNON BLVD | LONG ISLAND CITY | NEW YORK | 11106 | (718) 267-2992 | | Metro | Queens | Ivonne Huertas | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Sea Sun Pinot Noir, Caymus Vineyards Cabernet Sauvignon California, Caymus-Suisan Walking Fool Red, Mer Soleil Santa Lucia Highlands Reserve Chardonnay | 15 | 15 | 17009 | 2042240 | 1166978 | Leah Guidarelli | 2025-06-11 00:00:00
550891 | | WAGNER METRO 2025 | Off Premises | 2025-06-20 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | POPS LIQUOR | 256 LONG BEACH RD | ISLAND PARK | NEW YORK | 11558 | (516) 431-0025 | | Long Island | Nassau | Kimberly Carlstrom | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Mer Soleil Silver Chardonnay, Mer Soleil Santa Lucia Highlands Reserve Chardonnay, Caymus-Suisan Walking Fool Red, Caymus Vineyards Cabernet Sauvignon California | 5 | 30 | 53909 | 1427852 | 1313303 | Leah Guidarelli | 2025-06-02 00:00:00
552179 | | WAGNER METRO 2025 | Off Premises | 2025-06-20 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | K & W LIQUORS INC. | 163 NEW HYDE PARK RD | FRANKLIN SQUARE | NEW YORK | 11010 | (516) 326-7721 | | Long Island | Nassau | Angela Soviero | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum White, Caymus Vineyards Cabernet Sauvignon California, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Mer Soleil Santa Lucia Highlands Reserve Chardonnay, Conundrum Red | 7 | 12 | 1714 | 1466309 | 1015778 | Leah Guidarelli | 2025-06-11 00:00:00
552529 | | WAGNER METRO 2025 | Off Premises | 2025-06-20 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | WINE CITY | 4000 JERICHO TURNPIKE | EAST NORTHPORT | NEW YORK | 11731 | (631) 623-6092 | | Long Island | Suffolk | Dana Scacco | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Emmolo Sauvignon Blanc, Sea Sun Pinot Noir, Conundrum White, Conundrum Red, Mer Soleil Silver Chardonnay | 4 | 11 | | | | Melissa Walker | 2025-06-13 00:00:00
546886 | | WAGNER METRO 2025 | Off Premises | 2025-06-20 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | STANT | 790 GRAND BLVD | DEER PARK | NEW YORK | 11729 | (631) 242-0318 | | Long Island | Suffolk | Hahn Pugliese | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Sea Sun Chardonnay, Sea Sun Pinot Noir, Mer Soleil Silver Chardonnay | 8 | 23 | 28214 | | 1243300 | Leah Guidarelli | 2025-05-06 00:00:00
548136 | | WAGNER METRO 2025 | Off Premises | 2025-06-20 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | PRICE RITE | 689 OLD COUNTRY RD | DIX HILLS | NEW YORK | 11746 | (631) 549-8899 | | Long Island | Suffolk | Diana Kozic | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum White, Conundrum Red, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Sea Sun Chardonnay, Caymus Vineyards Cabernet Sauvignon California | 13 | 20 | 1382 | 1410403 | 1146347 | Leah Guidarelli | 2025-05-14 00:00:00
543074 | | WAGNER UNY OFF 2025 | Off Premises | 2025-06-21 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | CHM LIQUORS (COSTCO) | 345 WESTFALL RD | ROCHESTER | NEW YORK | 14620 | (585) 292-0007 | | Rochester | | Ellen Muto | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Caymus-Suisan Walking Fool Red, Conundrum White, Conundrum Red, Caymus California Paso Robles Cabernet Sauvignon | 9 | 33 | 52983 | | 3160519 | Jadyn Siuta | 2025-04-07 00:00:00
544247 | | WAGNER METRO 2025 | Off Premises | 2025-06-21 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | OAKDALE W & L BUSTER | 949D MONTAUK HWY | OAKDALE | NEW YORK | 11769 | (631) 567-1603 | | Long Island | Suffolk | Nicole Benincasa | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Sea Sun Pinot Noir, Sea Sun Chardonnay, Caymus Vineyards Cabernet Sauvignon California, Conundrum Red | 3 | 25 | 1316 | 1427797 | 1144571 | Leah Guidarelli | 2025-04-15 00:00:00
551264 | | WAGNER UNY OFF 2025 | Off Premises | 2025-06-21 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | IRONDEQUOIT PLAZA LIQ MAR | 525 TITUS AVE | ROCHESTER | NEW YORK | | (585) 467-8420 | | Rochester | | Christine Miller | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Conundrum White, Mer Soleil Santa Lucia Highlands Reserve Chardonnay, Sea Sun Chardonnay | 3 | 8 | 62413 | 1409808 | 3171632 | Kimberly Danielewicz | 2025-06-05 00:00:00
547904 | | WAGNER METRO 2025 | Off Premises | 2025-06-21 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | JERICHO WINES AND LIQUORS (GARDEN CITY) | 2335 JERICHO TPKE | NEW HYDE PARK | NEW YORK | 11040 | (516) 747-0599 | | Long Island | Nassau | Angela DeMauro | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum White, Conundrum Red, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Mer Soleil Santa Lucia Highlands Reserve Chardonnay | 4 | 15 | 15168 | 1427692 | 1166351 | Leah Guidarelli | 2025-05-14 00:00:00
551373 | | WAGNER METRO 2025 | Off Premises | 2025-06-21 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | WANTAGH WINES & SPIRITS (WANTAGH AVE)/NEIGHBORS WINES | 1225 WANTAGH AVE | WANTAGH | NEW YORK | 11793 | (516) 557-2489 | | Long Island | Nassau | Catha-Ann Bucaro | 1 | 238 | 0 | 0 | 0 | 0 | 4.12 | 0 | 242.12 | Mer Soleil Santa Lucia Highlands Reserve Chardonnay, Sea Sun Chardonnay, Conundrum White, Caymus Vineyards Cabernet Sauvignon California | 4 | 18 | 53809 | 1485481 | 1311201 | Leah Guidarelli | 2025-06-05 00:00:00
551390 | | WAGNER METRO 2025 | Off Premises | 2025-06-21 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | CROSSROADS W & L | 808 C HICKSVILLE RD. | MASSAPEQUA | NEW YORK | 11758 | (516) 797-7760 | | Long Island | Nassau | Cathy DiPietro | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Sea Sun Chardonnay, Caymus-Suisan Walking Fool Red, Conundrum White, Caymus Vineyards Cabernet Sauvignon California | 5 | 30 | 238 | 1409463 | 1015993 | Leah Guidarelli | 2025-06-05 00:00:00
551471 | | WAGNER METRO 2025 | Off Premises | 2025-06-21 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | SI DISCOUNT / FOREST-BARD LIQUORS INC | 467 FOREST AVE | STATEN ISLAND | NEW YORK | 10301 | (718) 448-8700 | | Metro | Staten Island | Italia Cicero-Lai | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Emmolo Sauvignon Blanc, Mer Soleil Santa Lucia Highlands Reserve Chardonnay, Conundrum Red | 3 | 12 | 40841 | | 1268801 | Leah Guidarelli | 2025-06-06 00:00:00
552336 | | WAGNER METRO 2025 | Off Premises | 2025-06-21 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | POPE LIQUORS, INC. | 2799 D.RTE.112 | MEDFORD | NEW YORK | 11763 | (631) 289-1660 | | Long Island | Suffolk | Diana Lopez | 1 | 238 | 0 | 0 | 0 | 0 | 3.25 | 0 | 241.25 | Mer Soleil Santa Lucia Highlands Reserve Chardonnay, Emmolo Sauvignon Blanc, Caymus Vineyards Cabernet Sauvignon California, Conundrum Red | 3 | 14 | 1557 | 1410336 | 1046069 | Leah Guidarelli | 2025-06-12 00:00:00
547055 | | WAGNER METRO 2025 | Off Premises | 2025-06-21 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | BROADWAY LIQUORS & WINES WAREHOUSE | 5790 BROADWAY | BRONX | NEW YORK | 10463 | (347) 843-8329 | | Metro | Bronx | Nery Rosa | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Conundrum Red, Mer Soleil Santa Lucia Highlands Reserve Chardonnay | 11 | 50 | 50730 | | 1296935 | Leah Guidarelli | 2025-05-07 00:00:00
553300 | | WAGNER METRO 2025 | Off Premises | 2025-06-21 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | ALLSTAR W&L | 248-12 NORTHERN BLVD | LITTLE NECK | NEW YORK | 11362 | (718) 819-0388 | | Metro | Queens | Cindy Martinez | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Sea Sun Chardonnay, Sea Sun Pinot Noir, Emmolo Sauvignon Blanc, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Red Schooner Transit 3 | 2 | 15 | 44486 | | 1257485 | Leah Guidarelli | 2025-06-19 00:00:00
551087 | | WAGNER METRO 2025 | Off Premises | 2025-06-26 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | EHP LIQUOR/COSTCO RIVERHEAD | 1774 OLD COUNTRY RD | RIVERHEAD | NEW YORK | 11901 | (631) 208-8800 | | Long Island | Suffolk | Leslie Rossi | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Conundrum Red, Conundrum White, Caymus Vineyards Cabernet Sauvignon California | 10 | 50 | 43764 | | 1272115 | Leah Guidarelli | 2025-06-03 00:00:00
552337 | | WAGNER METRO 2025 | Off Premises | 2025-06-26 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | SWIFTWAY WINE & LIQUOR | 1604 ROUTE 112 | MEDFORD | NEW YORK | 11763 | (631) 654-8000 | | Long Island | Suffolk | Cindy DeMasi | 1 | 238 | 0 | 0 | 0 | 0 | 2.49 | 0 | 240.49 | Sea Sun Pinot Noir, Sea Sun Chardonnay, Caymus Vineyards Cabernet Sauvignon California, Conundrum White | 2 | 18 | 1819 | 1410618 | 1150730 | Leah Guidarelli | 2025-06-12 00:00:00
552255 | | WAGNER UNY OFF 2025 | Off Premises | 2025-06-27 00:00:00 | 15:00:00 | 18:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | WEBSTER WINE & SPIRITS (960 RIDGE RD, #12288) | 960 RIDGE RD | WEBSTER | NEW YORK | | (585) 671-1686 | | Rochester | | Anne Lambert | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum White, Conundrum Red, Sea Sun Chardonnay, Caymus California Paso Robles Cabernet Sauvignon | 7 | 35 | 12288 | 1428095 | 3009671 | Kimberly Danielewicz | 2025-06-12 00:00:00
552846 | | WAGNER METRO 2025 | Off Premises | 2025-06-27 00:00:00 | 15:00:00 | 18:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | GARDEN CITY DISCOUNT (BJ'S) | 711 STEWART AVE | GARDEN CITY | NEW YORK | 11530 | (516) 228-9463 | | Long Island | Nassau | Gabriella Sferlazza | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus Vineyards Cabernet Sauvignon California, Mer Soleil Santa Lucia Highlands Reserve Chardonnay, Caymus-Suisan Walking Fool Red, Conundrum Red | 4 | 5 | 40963 | | 1268275 | Leah Guidarelli | 2025-06-16 00:00:00
547061 | | WAGNER METRO 2025 | Off Premises | 2025-06-27 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | K & D LIQUORS, INC. | 1343 MADISON AVE | NEW YORK | NEW YORK | 10128 | (212) 289-1818 | | Metro | New York | Joseph Carestia | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus Vineyards Cabernet Sauvignon California, Conundrum White, Mer Soleil Silver Chardonnay | 9 | 39 | 993 | 1409876 | 1023841 | Leah Guidarelli | 2025-05-07 00:00:00
550710 | | WAGNER UNY OFF 2025 | Off Premises | 2025-06-27 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | THRUWAY LIQUORS | 78 OAK STREET | WALDEN | NEW YORK | 12586 | (845) 778-7114 | | Hudson Valley/Rockland | | Gyongyi McQueston | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum Red, Mer Soleil Santa Lucia Highlands Reserve Chardonnay, Caymus Vineyards Cabernet Sauvignon California, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7 | 3 | 12 | 62737 | 1485480 | 2195905 | Leah Guidarelli | 2025-06-02 00:00:00
551176 | | WAGNER METRO 2025 | Off Premises | 2025-06-27 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | LAKE SUCCESS WINE AND SPIRIT | 1560 UNION TPKE | NEW HYDE PARK | NEW YORK | 11040 | (516) 216-5437 | | Long Island | Nassau | Angela DeMauro | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Emmolo Sauvignon Blanc, Sea Sun Pinot Noir, Sea Sun Chardonnay, Caymus Vineyards Cabernet Sauvignon California, Mer Soleil Santa Lucia Highlands Reserve Chardonnay | 7 | 14 | 49485 | | 1296093 | Leah Guidarelli | 2025-06-04 00:00:00
551395 | | WAGNER METRO 2025 | Off Premises | 2025-06-27 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | NEWBRIDGE WINE & LIQUORS | 1377 NEWBRIDGE RD | BELLMORE | NEW YORK | 11710 | (516) 785-7112 | | Long Island | Nassau | Susan Laudani-Stolfi | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Sea Sun Pinot Noir, Conundrum Red, Conundrum White, Caymus Vineyards Cabernet Sauvignon California | 3 | 11 | 21467 | 3188885 | 1199322 | Leah Guidarelli | 2025-06-05 00:00:00
551469 | | WAGNER METRO 2025 | Off Premises | 2025-06-27 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | CITY WINE CELLAR INC | 2295 RICHMOND AVE | STATEN ISLAND | NEW YORK | 10314 | (718) 494-1400 | | Metro | Staten Island | Tanya Nelson | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Emmolo Sauvignon Blanc, Mer Soleil Silver Chardonnay, Conundrum White | 10 | 19 | 59353 | | 1337148 | Leah Guidarelli | 2025-06-06 00:00:00
551473 | | WAGNER METRO 2025 | Off Premises | 2025-06-27 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | HOLBROOK LIQUORS/BECKENDORF | 125 BEACON DRIVE | HOLBROOK | NEW YORK | 11741 | (631) 563-3515 | | Long Island | Suffolk | Brittany Daly | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Mer Soleil Santa Lucia Highlands Reserve Chardonnay, Caymus Vineyards Cabernet Sauvignon California | 4 | 25 | 11235 | 1623549 | 1116039 | Leah Guidarelli | 2025-06-06 00:00:00
551862 | | WAGNER METRO 2025 | Off Premises | 2025-06-27 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | LEISER'S LIQUORS INC | 4130 162ND ST | FLUSHING | NEW YORK | 11358 | (718) 359-3106 | | Metro | Queens | Nolga Batista | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Sea Sun Chardonnay, Sea Sun Pinot Noir, Conundrum White, Caymus Vineyards Cabernet Sauvignon California | 8 | 22 | 1409 | 1409953 | 1039213 | Leah Guidarelli | 2025-06-10 00:00:00
552199 | | WAGNER METRO 2025 | Off Premises | 2025-06-27 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | NEW HYDE PARK WINE & LIQ/SK LIQUORS | 400 HILLSIDE AVE | NEW HYDE PARK | NEW YORK | 11040 | (516) 354-9105 | | Long Island | Nassau | Regine Hoveling | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum White, Emmolo Sauvignon Blanc, Sea Sun Pinot Noir, Conundrum Red | 8 | 22 | 1796 | 1410363 | 1139145 | Leah Guidarelli | 2025-06-12 00:00:00
552339 | | WAGNER METRO 2025 | Off Premises | 2025-06-27 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | MICHAELS LIQUORS | 802 E MAIN ST | RIVERHEAD | NEW YORK | 11901 | (631) 727-7410 | | Long Island | Suffolk | Olga Zuluaga | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum Red, Emmolo Sauvignon Blanc, Caymus-Suisan Walking Fool Red, Conundrum White | 12 | 40 | 1616 | 1427574 | 1046163 | Leah Guidarelli | 2025-06-12 00:00:00
553897 | | WAGNER METRO 2025 | Off Premises | 2025-06-27 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | BAYSHORE DISCOUNT LIQUOR INC | 567 E MAIN ST | BAYSHORE | NEW YORK | 11706 | | | Long Island | Suffolk | Madeline Boettcher | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Mer Soleil Santa Lucia Highlands Reserve Chardonnay, Caymus Vineyards Cabernet Sauvignon California, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Conundrum White | 3 | 15 | 65850 | | 6054695 | Leah Guidarelli | 2025-06-24 00:00:00
551075 | | WAGNER METRO 2025 | Off Premises | 2025-06-27 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | PEPPINOS LIQUORS & WINES | 7723 3RD AVE | BROOKLYN | NEW YORK | 11209 | (347) 517-4706 | | Metro | Brooklyn | Adele Ofman | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Red Schooner Voyage 11, Mer Soleil Santa Lucia Highlands Reserve Chardonnay, Emmolo Sauvignon Blanc, Caymus Vineyards Cabernet Sauvignon California | 8 | 20 | 49143 | | 1292491 | Leah Guidarelli | 2025-06-03 00:00:00
553234 | | WAGNER METRO 2025 | Off Premises | 2025-06-27 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | BEVERAGE LOVERS WAREHOUSE / LWW VALLEY STREAM | 22 W CIRCLE DR | VALLEY STREAM | NEW YORK | 11581 | (516) 887-9463 | | Long Island | Nassau | Sandra Verene | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Sea Sun Pinot Noir, Conundrum White, Emmolo Sauvignon Blanc | 29 | 36 | 54697 | | 1313465 | Leah Guidarelli | 2025-06-19 00:00:00
552390 | | WAGNER UNY OFF 2025 | Off Premises | 2025-06-28 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | HELLER'S SS&P WINE & LIQUOR WAREHOUSE | 3701 NY HWY 43 | WEST SAND LAKE | NEW YORK | 12196 | (518) 674-6196 | | North Albany | | Eric Patton | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum White, Sea Sun Pinot Noir, Mer Soleil Silver Chardonnay, Mer Soleil Santa Lucia Highlands Reserve Chardonnay, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7 | 5 | 25 | 57819 | | 2168362 | Kimberly Danielewicz | 2025-06-12 00:00:00
553304 | | WAGNER UNY OFF 2025 | Off Premises | 2025-06-28 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | WINE & LIQUOR CHATEAU | 497 W KLEIN RD | WILLIAMSVILLE | NEW YORK | 14221 | (716) 308-0612 | | Buffalo | | Selene Kranz | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum White, Conundrum Red, Caymus-Suisan Walking Fool Red, Emmolo Sauvignon Blanc, Caymus Vineyards Cabernet Sauvignon California | 5 | 19 | | | 3154622 | Kimberly Danielewicz | 2025-06-19 00:00:00
553896 | | WAGNER METRO 2025 | Off Premises | 2025-06-28 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | WINE & LIQUOR DEPOT/SAYRON | 207 ISLIP AVE | ISLIP | NEW YORK | 11751 | (631) 581-1680 | | Long Island | Suffolk | Catherine Becker | 1 | 238 | 0 | 0 | 0 | 0 | 4.33 | 0 | 242.33 | Mer Soleil Santa Lucia Highlands Reserve Chardonnay, Emmolo Sauvignon Blanc, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Conundrum Red | 10 | 18 | 1058 | 1445760 | 1046050 | Leah Guidarelli | 2025-06-24 00:00:00
549627 | | WAGNER METRO 2025 | Off Premises | 2025-06-28 00:00:00 | 15:00:00 | 18:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | SEAHOLM'S W & L | 134 WALL ST | HUNTINGTON | NEW YORK | 11743 | (631) 427-0031 | | Long Island | Nassau | Jessica Bohn | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum White, Conundrum Red, Emmolo Sauvignon Blanc, Mer Soleil Santa Lucia Highlands Reserve Chardonnay | 8 | 13 | 40552 | | 1268656 | Leah Guidarelli | 2025-05-23 00:00:00
552709 | | WAGNER METRO 2025 | Off Premises | 2025-06-28 00:00:00 | 16:30:00 | 19:30:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | ELMSFORD WINE & LIQUORS (MAIN ST) | 111 E MAIN ST | ELMSFORD | NEW YORK | 10523 | (914) 909-4760 | | Long Island | Westchester | Michelle Debonis-Matica | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Sea Sun Chardonnay, Sea Sun Pinot Noir, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7 | 4 | 25 | 54251 | | 1312770 | Leah Guidarelli | 2025-06-16 00:00:00
551088 | | WAGNER METRO 2025 | Off Premises | 2025-07-02 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | EHP LIQUOR/COSTCO RIVERHEAD | 1774 OLD COUNTRY RD | RIVERHEAD | NEW YORK | 11901 | (631) 208-8800 | | Long Island | Suffolk | Jilliane Amato | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Conundrum Red, Conundrum White, Caymus Vineyards Cabernet Sauvignon California | 12 | 50 | 43764 | | 1272115 | Leah Guidarelli | 2025-06-03 00:00:00
553895 | | WAGNER METRO 2025 | Off Premises | 2025-07-02 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | HOLBROOK LIQUORS/BECKENDORF | 125 BEACON DRIVE | HOLBROOK | NEW YORK | 11741 | (631) 563-3515 | | Long Island | Suffolk | Rachel Tufano | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Mer Soleil Santa Lucia Highlands Reserve Chardonnay, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Caymus Vineyards Cabernet Sauvignon Napa Valley 50th Anniversary | 13 | 27 | 11235 | 1623549 | 1116039 | Leah Guidarelli | 2025-06-24 00:00:00
552012 | | WAGNER METRO 2025 | Off Premises | 2025-07-03 00:00:00 | 14:00:00 | 17:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | YOUNGS LIQUORS | 505 PLANDOME RD | MANHASSET | NEW YORK | 11030 | (516) 627-1234 | | Long Island | Nassau | Angela Soviero | 1 | 238 | 0 | 0 | 0 | 0 | 4.34 | 0 | 242.34 | Sea Sun Pinot Noir, Caymus Vineyards Cabernet Sauvignon California, Conundrum White, Mer Soleil Santa Lucia Highlands Reserve Chardonnay | 13 | 20 | 45742 | | 1284308 | Leah Guidarelli | 2025-06-10 00:00:00
552039 | | WAGNER METRO 2025 | Off Premises | 2025-07-03 00:00:00 | 15:00:00 | 18:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | K H & H/LONG ISLAND CITY LIQ | 3250 VERNON BLVD | LONG ISLAND CITY | NEW YORK | 11106 | (718) 267-2992 | | Metro | Queens | Mary Scocozza | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Sea Sun Pinot Noir, Caymus Vineyards Cabernet Sauvignon California, Caymus-Suisan Walking Fool Red, Mer Soleil Santa Lucia Highlands Reserve Chardonnay | 18 | 50 | 17009 | 2042240 | 1166978 | Leah Guidarelli | 2025-06-11 00:00:00
550951 | | WAGNER UNY OFF 2025 | Off Premises | 2025-07-03 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | PREMIUM WINE & SPIRITS (7980 TRANSIT RD) | 7980 TRANSIT RD | WILLIAMSVILLE | NEW YORK | 14221 | (716) 565-3020 | | Buffalo | | Katelyn Papierski | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum Red, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Mer Soleil Chardonnay Reserve, Caymus Vineyards Cabernet Sauvignon California, Emmolo Sauvignon Blanc | 15 | 23 | 12337 | 1410349 | 3004110 | Kimberly Danielewicz | 2025-06-03 00:00:00
551854 | | WAGNER METRO 2025 | Off Premises | 2025-07-03 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | MORTON WILLIAMS (23RD ST) | 311 E 23RD STREET | NEW YORK | NEW YORK | | (212) 213-0021 | | Metro | New York | Russell Marisak | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Mer Soleil Santa Lucia Highlands Reserve Chardonnay, Caymus-Suisan Walking Fool Red, Emmolo Sauvignon Blanc | 4 | 22 | | | | Leah Guidarelli | 2025-06-10 00:00:00
552211 | | WAGNER UNY OFF 2025 | Off Premises | 2025-07-03 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | PITTSFORD CENTURY WINES & (WEGMANS) | 3349 MONROE AVE #55 | ROCHESTER | NEW YORK | 14618 | (585) 248-0931 | | Rochester | | Bernadette Rizzo | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum White, Emmolo Sauvignon Blanc, Mer Soleil Santa Lucia Highlands Reserve Chardonnay, Caymus Vineyards Cabernet Sauvignon California | 8 | 15 | 3458 | 2199578 | 3135403 | Kimberly Danielewicz | 2025-06-12 00:00:00
546887 | | WAGNER METRO 2025 | Off Premises | 2025-07-03 00:00:00 | 16:30:00 | 19:30:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | STANT | 790 GRAND BLVD | DEER PARK | NEW YORK | 11729 | (631) 242-0318 | | Long Island | Suffolk | Hahn Pugliese | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Sea Sun Chardonnay, Sea Sun Pinot Noir, Mer Soleil Santa Lucia Highlands Reserve Chardonnay | 9 | 28 | 28214 | | 1243300 | Leah Guidarelli | 2025-05-06 00:00:00
547730 | | WAGNER METRO 2025 | Off Premises | 2025-07-04 00:00:00 | 15:00:00 | 18:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | EAST CHELSEA SPIRITS INC / LIQUOR UP & WINE DOWN | 383 FIRST AVE | NEW YORK | NEW YORK | 10010 | (646) 964-4173 | | Metro | New York | Crystallia Karl | 1 | 238 | 0 | 0 | 0 | 0 | 4.34 | 0 | 242.34 | Sea Sun Chardonnay, Sea Sun Pinot Noir, Emmolo Sauvignon Blanc, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 3 | 3 | 14 | 53548 | 762812 | 1308045 | Allison Ackerman | 2025-05-13 00:00:00
553893 | | WAGNER METRO 2025 | Off Premises | 2025-07-05 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | WINE & LIQUOR DEPOT/SAYRON | 207 ISLIP AVE | ISLIP | NEW YORK | 11751 | (631) 581-1680 | | Long Island | Suffolk | Shawna Heflin | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Mer Soleil Silver Chardonnay, Caymus Vineyards Cabernet Sauvignon California, Sea Sun Pinot Noir, Conundrum White | 4 | 5 | 1058 | 1445760 | 1046050 | Leah Guidarelli | 2025-06-24 00:00:00
553894 | | WAGNER METRO 2025 | Off Premises | 2025-07-05 00:00:00 | 15:00:00 | 18:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | BAYSHORE DISCOUNT LIQUOR INC | 567 E MAIN ST | BAYSHORE | NEW YORK | 11706 | | | Long Island | Suffolk | Catherine Becker | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus Vineyards Cabernet Sauvignon Napa Valley, Caymus Vineyards Cabernet Sauvignon California, Caymus-Suisan Walking Fool Red, Conundrum White | 2 | 14 | 65850 | | 6054695 | Leah Guidarelli | 2025-06-24 00:00:00
551089 | | WAGNER METRO 2025 | Off Premises | 2025-07-10 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | EHP LIQUOR/COSTCO RIVERHEAD | 1774 OLD COUNTRY RD | RIVERHEAD | NEW YORK | 11901 | (631) 208-8800 | | Long Island | Suffolk | Leslie Rossi | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Conundrum Red, Conundrum White, Caymus Vineyards Cabernet Sauvignon California | 7 | 30 | 43764 | | 1272115 | Leah Guidarelli | 2025-06-03 00:00:00
552257 | | WAGNER UNY OFF 2025 | Off Premises | 2025-07-11 00:00:00 | 15:00:00 | 18:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | LIQUOR BOX (3670 MT READ BLVD) | 3670 MT READ BLVD | ROCHESTER | NEW YORK | | (585) 448-1998 | | Rochester | | Kathryn Waugh | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum White, Sea Sun Chardonnay, Caymus California Paso Robles Cabernet Sauvignon, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7 | 1 | 38 | 52313 | 1998896 | 3009714 | Kimberly Danielewicz | 2025-06-12 00:00:00
543075 | | WAGNER UNY OFF 2025 | Off Premises | 2025-07-11 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | CHM LIQUORS (COSTCO) | 345 WESTFALL RD | ROCHESTER | NEW YORK | 14620 | (585) 292-0007 | | Rochester | | Christine Miller | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Caymus-Suisan Walking Fool Red, Conundrum White, Conundrum Red, Caymus California Paso Robles Cabernet Sauvignon | 7 | 17 | 52983 | | 3160519 | Jadyn Siuta | 2025-04-07 00:00:00
553484 | | WAGNER METRO 2025 | Off Premises | 2025-07-11 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | ULTIMATE WINES & SPIRITS | 310-320 SAW MILL RIVER ROAD | ELMSFORD | NEW YORK | 10523 | (914) 488-6544 | | Long Island | Westchester | Desiree Ellis | 1 | 238 | 0 | 0 | 0 | 0 | 3.24 | 0 | 241.24 | Mer Soleil Silver Chardonnay, Caymus Vineyards Cabernet Sauvignon California | 6 | 17 | 63874 | | | Leah Guidarelli | 2025-06-21 00:00:00
552847 | | WAGNER METRO 2025 | Off Premises | 2025-07-11 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | NECK ROAD WINE & LIQUOR INC | 1608 GRAVESEND NECK RD | BROOKLYN | NEW YORK | 11229 | (718) 648-3383 | | Metro | Brooklyn | Adele Ofman | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Sea Sun Chardonnay, Mer Soleil Santa Lucia Highlands Reserve Chardonnay, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Conundrum Red | 3 | 25 | 48366 | | 1293700 | Leah Guidarelli | 2025-06-16 00:00:00
553235 | | WAGNER METRO 2025 | Off Premises | 2025-07-11 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | BEVERAGE LOVERS WAREHOUSE / LWW VALLEY STREAM | 22 W CIRCLE DR | VALLEY STREAM | NEW YORK | 11581 | (516) 887-9463 | | Long Island | Nassau | Rochelle Herron | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Sea Sun Chardonnay, Conundrum White, Emmolo Sauvignon Blanc, Caymus-Suisan Walking Fool Red | 2 | 16 | 54697 | | 1313465 | Leah Guidarelli | 2025-06-19 00:00:00
552214 | | WAGNER UNY OFF 2025 | Off Premises | 2025-07-12 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | MAHAN'S DISCOUNT LIQUOR & | 6515 BROCKPORT SPENCERPORT RD | BROCKPORT | NEW YORK | 14420 | (585) 637-4149 | | Rochester | | Erin Murphy | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum White, Emmolo Sauvignon Blanc, Caymus Vineyards Cabernet Sauvignon California, Sea Sun Chardonnay, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7 | 3 | 28 | 54417 | 1410030 | 3009646 | Kimberly Danielewicz | 2025-06-12 00:00:00
552360 | | WAGNER METRO 2025 | Off Premises | 2025-07-12 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | SWIFTWAY WINE & LIQUOR | 1604 ROUTE 112 | MEDFORD | NEW YORK | 11763 | (631) 654-8000 | | Long Island | Suffolk | Rosemary Gledhill | 1 | 238 | 0 | 0 | 0 | 0 | 2.49 | 0 | 240.49 | Sea Sun Chardonnay, Caymus Vineyards Cabernet Sauvignon California, Caymus-Suisan Walking Fool Red, Conundrum White | 2 | 18 | 1819 | 1410618 | 1150730 | Leah Guidarelli | 2025-06-12 00:00:00
552874 | | WAGNER METRO 2025 | Off Premises | 2025-07-12 00:00:00 | 14:00:00 | 17:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | PRICE RITE | 689 OLD COUNTRY RD | DIX HILLS | NEW YORK | 11746 | (631) 549-8899 | | Long Island | Suffolk | Helena Diringerova | 1 | 238 | 0 | 0 | 0 | 0 | 3.29 | 0 | 241.29 | Sea Sun Chardonnay, Conundrum White, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Conundrum Red, Caymus Vineyards Cabernet Sauvignon California | 14 | 15 | 1382 | 1410403 | 1146347 | Leah Guidarelli | 2025-06-17 00:00:00
549975 | | WAGNER METRO 2025 | Off Premises | 2025-07-12 00:00:00 | 15:00:00 | 18:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | INTERNATIONAL WINE G | 270 NASSAU BLVD | GARDEN CITY | NEW YORK | 11530 | (516) 486-3383 | | Long Island | Nassau | Lidia Rodriguez | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Sea Sun Pinot Noir, Conundrum Red, Sea Sun Chardonnay, Caymus Vineyards Cabernet Sauvignon California | 13 | 15 | 56699 | 1409803 | 1015845 | Leah Guidarelli | 2025-05-27 00:00:00
551829 | | WAGNER METRO 2025 | Off Premises | 2025-07-12 00:00:00 | 15:30:00 | 18:30:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | FUJIAN LIQUOR PLAZA | 133 WALT WHITMAN RD | HUNTINGTON STATION | NEW YORK | 11746 | (631) 271-0004 | | Long Island | Nassau | Dianna Amini | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus Vineyards Cabernet Sauvignon California, Emmolo Sauvignon Blanc, Conundrum Red, Mer Soleil Santa Lucia Highlands Reserve Chardonnay | 6 | 13 | 29208 | | 1243640 | Leah Guidarelli | 2025-06-09 00:00:00
551374 | | WAGNER METRO 2025 | Off Premises | 2025-07-12 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | WANTAGH WINES & SPIRITS (WANTAGH AVE)/NEIGHBORS WINES | 1225 WANTAGH AVE | WANTAGH | NEW YORK | 11793 | (516) 557-2489 | | Long Island | Nassau | Dina Sferlazza | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Mer Soleil Silver Chardonnay, Sea Sun Pinot Noir, Conundrum White, Caymus Vineyards Cabernet Sauvignon California | 5 | 15 | 53809 | 1485481 | 1311201 | Leah Guidarelli | 2025-06-05 00:00:00
551465 | | WAGNER METRO 2025 | Off Premises | 2025-07-12 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | CHERRYWOOD WINE, INC. | 1152 WANTAGH AVE | WANTAGH | NEW YORK | 11793 | (516) 785-1121 | | Long Island | Nassau | Elizabeth Kiel | 1 | 238 | 0 | 0 | 0 | 0 | 3.79 | 0 | 241.79 | Sea Sun Pinot Noir, Mer Soleil Silver Chardonnay, Conundrum White, Caymus Vineyards Cabernet Sauvignon California | 8 | 38 | 2515 | 1409853 | 1134280 | Leah Guidarelli | 2025-06-06 00:00:00
554435 | | WAGNER METRO 2025 | Off Premises | 2025-07-12 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | BROADWAY LIQUORS & WINES WAREHOUSE | 5790 BROADWAY | BRONX | NEW YORK | 10463 | (347) 843-8329 | | Metro | Bronx | JulieMarie Bonsanti | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Mer Soleil Silver Chardonnay, Sea Sun Pinot Noir, Conundrum White | 12 | 34 | 50730 | | 1296935 | Leah Guidarelli | 2025-06-27 00:00:00
551090 | | WAGNER METRO 2025 | Off Premises | 2025-07-17 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | EHP LIQUOR/COSTCO RIVERHEAD | 1774 OLD COUNTRY RD | RIVERHEAD | NEW YORK | 11901 | (631) 208-8800 | | Long Island | Suffolk | Cindy DeMasi | 1 | 238 | 0 | 0 | 0 | 0 | 3.58 | 0 | 241.58 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Conundrum Red, Conundrum White, Caymus Vineyards Cabernet Sauvignon California | 5 | 35 | 43764 | | 1272115 | Leah Guidarelli | 2025-06-03 00:00:00
553917 | | WAGNER UNY OFF 2025 | Off Premises | 2025-07-17 00:00:00 | 15:00:00 | 18:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | EASTWAY LIQUOR | 1217 BAY ROAD | WEBSTER | NEW YORK | | (585) 671-4594 | | Rochester | | Bernadette Rizzo | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum White, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Mer Soleil Santa Lucia Highlands Reserve Chardonnay, Caymus Vineyards Cabernet Sauvignon California | 4 | 10 | 12215 | 1409560 | | Kimberly Danielewicz | 2025-06-24 00:00:00
552361 | | WAGNER METRO 2025 | Off Premises | 2025-07-18 00:00:00 | 15:00:00 | 18:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | MICHAELS LIQUORS | 802 E MAIN ST | RIVERHEAD | NEW YORK | 11901 | (631) 727-7410 | | Long Island | Suffolk | Richard Dragani | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Sea Sun Pinot Noir, Mer Soleil Santa Lucia Highlands Reserve Chardonnay, Mer Soleil Silver Chardonnay, Emmolo Sauvignon Blanc | 6 | 25 | 1616 | 1427574 | 1046163 | Leah Guidarelli | 2025-06-12 00:00:00
551177 | | WAGNER METRO 2025 | Off Premises | 2025-07-18 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | LAKE SUCCESS WINE AND SPIRIT | 1560 UNION TPKE | NEW HYDE PARK | NEW YORK | 11040 | (516) 216-5437 | | Long Island | Nassau | Diana Cervi Suppa | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Emmolo Sauvignon Blanc, Sea Sun Pinot Noir, Sea Sun Chardonnay, Caymus Vineyards Cabernet Sauvignon California, Mer Soleil Santa Lucia Highlands Reserve Chardonnay | 12 | 20 | 49485 | | 1296093 | Leah Guidarelli | 2025-06-04 00:00:00
551396 | | WAGNER METRO 2025 | Off Premises | 2025-07-18 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | NEWBRIDGE WINE & LIQUORS | 1377 NEWBRIDGE RD | BELLMORE | NEW YORK | 11710 | (516) 785-7112 | | Long Island | Nassau | Stacy Del Ponte | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Sea Sun Pinot Noir, Mer Soleil Silver Chardonnay, Conundrum White, Caymus Vineyards Cabernet Sauvignon California | 3 | 12 | 21467 | 3188885 | 1199322 | Leah Guidarelli | 2025-06-05 00:00:00
552710 | | WAGNER METRO 2025 | Off Premises | 2025-07-18 00:00:00 | 16:30:00 | 19:30:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | ELMSFORD WINE & LIQUORS (MAIN ST) | 111 E MAIN ST | ELMSFORD | NEW YORK | 10523 | (914) 909-4760 | | Long Island | Westchester | Christina Reyes | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Sea Sun Chardonnay, Sea Sun Pinot Noir, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7 | 4 | 10 | 54251 | | 1312770 | Leah Guidarelli | 2025-06-16 00:00:00
555333 | | WAGNER UNY ON 2025- SAMPLES | On Premises | 2025-07-18 00:00:00 | 18:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | NIAGARA FALLS COUNTRY CLUB | 505 MOUNTAIN VIEW DR | LEWISTON | NEW YORK | | | | Buffalo | | Heather Riley | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Mer Soleil Santa Lucia Highlands Reserve Chardonnay, Caymus Vineyards Cabernet Sauvignon California | 0 | 100 | 25263 | 5140478 | 3011211 | Kimberly Danielewicz | 2025-07-08 00:00:00
551498 | | WAGNER METRO 2025 | Off Premises | 2025-07-19 00:00:00 | 12:00:00 | 15:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | WESTBURY LIQUORS | 1250 OLD COUNTRY RD | WESTBURY | NEW YORK | 11590 | (516) 832-8602 | | Long Island | Nassau | Elizabeth Kiel | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum White, Sea Sun Pinot Noir, Caymus-Suisan Walking Fool Red, Caymus Vineyards Cabernet Sauvignon California | 18 | 50 | 11234 | 1410770 | 1117174 | Leah Guidarelli | 2025-06-06 00:00:00
554822 | | WAGNER METRO 2025 | Off Premises | 2025-07-19 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | CHERRYWOOD WINE, INC. | 1152 WANTAGH AVE | WANTAGH | NEW YORK | 11793 | (516) 785-1121 | | Long Island | Nassau | Cathy DiPietro | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Mer Soleil Santa Lucia Highlands Reserve Chardonnay, Emmolo Sauvignon Blanc, Conundrum Red, Sea Sun Pinot Noir | 21 | 30 | 2515 | 1409853 | 1134280 | Leah Guidarelli | 2025-07-02 00:00:00
554877 | | WAGNER UNY OFF 2025 | Off Premises | 2025-07-19 00:00:00 | 15:00:00 | 18:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | BIN 94 NEW WINDSOR | 115 TEMPLE HILL ROAD | NEW WINDSOR | NEW YORK | 12553 | | | Hudson Valley/Rockland | | Jack Harrington | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Mer Soleil Chardonnay Reserve Monterey, Caymus Vineyards Cabernet Sauvignon California, Conundrum White | 3 | 15 | 45309 | | | Kimberly Danielewicz | 2025-07-02 00:00:00
551391 | | WAGNER METRO 2025 | Off Premises | 2025-07-19 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | CROSSROADS W & L | 808 C HICKSVILLE RD. | MASSAPEQUA | NEW YORK | 11758 | (516) 797-7760 | | Long Island | Nassau | Susan Laudani-Stolfi | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Sea Sun Pinot Noir, Mer Soleil Santa Lucia Highlands Reserve Chardonnay, Conundrum White, Caymus Vineyards Cabernet Sauvignon California | 8 | 12 | 238 | 1409463 | 1015993 | Leah Guidarelli | 2025-06-05 00:00:00
551091 | | WAGNER METRO 2025 | Off Premises | 2025-07-24 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | EHP LIQUOR/COSTCO RIVERHEAD | 1774 OLD COUNTRY RD | RIVERHEAD | NEW YORK | 11901 | (631) 208-8800 | | Long Island | Suffolk | Kelly Ritter | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Conundrum Red, Conundrum White, Caymus Vineyards Cabernet Sauvignon California | 7 | 35 | 43764 | | 1272115 | Leah Guidarelli | 2025-06-03 00:00:00
556908 | | WAGNER METRO 2025 | Off Premises | 2025-07-25 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | EAST CHELSEA SPIRITS INC / LIQUOR UP & WINE DOWN | 383 FIRST AVE | NEW YORK | NEW YORK | 10010 | (646) 964-4173 | | Metro | New York | Nusrat Islam | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Emmolo Sauvignon Blanc, Sea Sun Chardonnay, Sea Sun Pinot Noir, Conundrum White | 7 | 45 | 53548 | 762812 | 1308045 | Leah Guidarelli | 2025-07-22 00:00:00
556466 | | WAGNER UNY OFF 2025 | Off Premises | 2025-07-26 00:00:00 | 12:00:00 | 15:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | JOHNSON CITY WINE & LIQUOR (WEGMANS) | 650 HARRY L DR | JOHNSON CITY | NEW YORK | 13790 | (607) 232-5200 | | Syracuse | | Heidi Johnson | 1 | 238 | 0 | 0 | 0 | 0 | 3.55 | 0 | 241.55 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Sea Sun Pinot Noir, Emmolo Sauvignon Blanc, Mer Soleil Silver Chardonnay, Caymus Vineyards Cabernet Sauvignon California | 11 | 29 | 42820 | | 2191398 | Kimberly Danielewicz | 2025-07-16 00:00:00
554826 | | WAGNER METRO 2025 | Off Premises | 2025-07-26 00:00:00 | 12:30:00 | 15:30:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | BOTTLE VALUES | 734 OLD BETHPAGE RD | BETHPAGE | NEW YORK | 11804 | (516) 420-1000 | | Long Island | Nassau | Frank DiGregorio | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Conundrum White, Conundrum Red, Caymus Vineyards Cabernet Sauvignon California | 7 | 12 | 36375 | | 1253952 | Leah Guidarelli | 2025-07-02 00:00:00
554436 | | WAGNER METRO 2025 | Off Premises | 2025-07-26 00:00:00 | 14:00:00 | 17:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | BROADWAY LIQUORS & WINES WAREHOUSE | 5790 BROADWAY | BRONX | NEW YORK | 10463 | (347) 843-8329 | | Metro | Bronx | Camilla Ivy | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Mer Soleil Santa Lucia Highlands Reserve Chardonnay, Conundrum Red, Conundrum White | 15 | 28 | 50730 | | 1296935 | Leah Guidarelli | 2025-06-27 00:00:00
554587 | | WAGNER METRO 2025 | Off Premises | 2025-07-26 00:00:00 | 15:00:00 | 18:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | GARDEN CITY DISCOUNT (BJ'S) | 711 STEWART AVE | GARDEN CITY | NEW YORK | 11530 | (516) 228-9463 | | Long Island | Nassau | Christine Hart | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Mer Soleil Santa Lucia Highlands Reserve Chardonnay, Caymus-Suisan Walking Fool Red, Conundrum White, Caymus Vineyards Cabernet Sauvignon California | 5 | 10 | 40963 | | 1268275 | Leah Guidarelli | 2025-06-30 00:00:00
552873 | | WAGNER METRO 2025 | Off Premises | 2025-07-26 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | PRICE RITE | 689 OLD COUNTRY RD | DIX HILLS | NEW YORK | 11746 | (631) 549-8899 | | Long Island | Suffolk | Helena Diringerova | 1 | 238 | 0 | 0 | 0 | 0 | 3.29 | 0 | 241.29 | Sea Sun Chardonnay, Conundrum White, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Conundrum Red, Caymus Vineyards Cabernet Sauvignon California | 21 | 17 | 1382 | 1410403 | 1146347 | Leah Guidarelli | 2025-06-17 00:00:00
556482 | | WAGNER METRO 2025 | Off Premises | 2025-07-31 00:00:00 | 15:00:00 | 18:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | K H & H/LONG ISLAND CITY LIQ | 3250 VERNON BLVD | LONG ISLAND CITY | NEW YORK | 11106 | (718) 267-2992 | | Metro | Queens | Mary Scocozza | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Mer Soleil Santa Lucia Highlands Reserve Chardonnay, Sea Sun Pinot Noir, Caymus Vineyards Cabernet Sauvignon California | 14 | 30 | 17009 | 2042240 | 1166978 | Leah Guidarelli | 2025-07-17 00:00:00
556736 | | WAGNER METRO 2025 | Off Premises | 2025-08-01 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | RYANN'S WINES | 1897 FRONT ST | EAST MEADOW | NEW YORK | 11554 | (516) 962-8250 | | Long Island | Nassau | Ann Battistelli | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Emmolo Sauvignon Blanc, Caymus Vineyards Cabernet Sauvignon California, Conundrum Red | 7 | 17 | 51989 | 1409910 | 1307045 | Leah Guidarelli | 2025-07-20 00:00:00
557600 | | WAGNER UNY OFF 2025 | Off Premises | 2025-08-02 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | BREMERS WINE & LIQUOR | 4684 COMMERCIAL DR | NEW HARTFORD | NEW YORK | 13413 | (315) 768-6400 | | Syracuse | | Jennifer Covel | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Mer Soleil Silver Chardonnay, Conundrum Red, Conundrum White | 34 | 30 | 27191 | 1785413 | 2503609 | Kimberly Danielewicz | 2025-07-28 00:00:00
556909 | | WAGNER METRO 2025 | Off Premises | 2025-08-02 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | EAST CHELSEA SPIRITS INC / LIQUOR UP & WINE DOWN | 383 FIRST AVE | NEW YORK | NEW YORK | 10010 | (646) 964-4173 | | Metro | New York | Crystallia Karl | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Emmolo Sauvignon Blanc, Sea Sun Chardonnay, Sea Sun Pinot Noir, Conundrum White | 8 | 17 | 53548 | 762812 | 1308045 | Leah Guidarelli | 2025-07-22 00:00:00
556483 | | WAGNER METRO 2025 | Off Premises | 2025-08-08 00:00:00 | 15:00:00 | 18:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | K H & H/LONG ISLAND CITY LIQ | 3250 VERNON BLVD | LONG ISLAND CITY | NEW YORK | 11106 | (718) 267-2992 | | Metro | Queens | Nolga Batista | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Mer Soleil Santa Lucia Highlands Reserve Chardonnay, Sea Sun Pinot Noir, Caymus Vineyards Cabernet Sauvignon California | 18 | 40 | 17009 | 2042240 | 1166978 | Leah Guidarelli | 2025-07-17 00:00:00
543076 | | WAGNER UNY OFF 2025 | Off Premises | 2025-08-08 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | CHM LIQUORS (COSTCO) | 345 WESTFALL RD | ROCHESTER | NEW YORK | 14620 | (585) 292-0007 | | Rochester | | Kim Palumbo | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Caymus-Suisan Walking Fool Red, Conundrum White, Conundrum Red, Caymus California Paso Robles Cabernet Sauvignon | 6 | 24 | 52983 | | 3160519 | Jadyn Siuta | 2025-04-07 00:00:00
554825 | | WAGNER METRO 2025 | Off Premises | 2025-08-15 00:00:00 | 12:30:00 | 15:30:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | BOTTLE VALUES | 734 OLD BETHPAGE RD | BETHPAGE | NEW YORK | 11804 | (516) 420-1000 | | Long Island | Nassau | Staci Rosen | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Conundrum White, Conundrum Red, Caymus Vineyards Cabernet Sauvignon California | 9 | 12 | 36375 | | 1253952 | Leah Guidarelli | 2025-07-02 00:00:00
551863 | | WAGNER METRO 2025 | Off Premises | 2025-08-15 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | CAPPY'S WAREHOUSE W & S I | 670 MERRICK RD | LYNBROOK | NEW YORK | 11580 | (516) 256-0444 | | Long Island | Nassau | Angela Soviero | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Emmolo Merlot, Emmolo Sauvignon Blanc, Conundrum White, Caymus Vineyards Cabernet Sauvignon California, Conundrum Red, Mer Soleil Santa Lucia Highlands Reserve Chardonnay | 7 | 22 | 16991 | 2042220 | 1174230 | Leah Guidarelli | 2025-06-10 00:00:00
551499 | | WAGNER METRO 2025 | Off Premises | 2025-08-16 00:00:00 | 15:00:00 | 18:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | WESTBURY LIQUORS | 1250 OLD COUNTRY RD | WESTBURY | NEW YORK | 11590 | (516) 832-8602 | | Long Island | Nassau | Victoria Main | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum White, Sea Sun Pinot Noir, Conundrum Red, Caymus Vineyards Cabernet Sauvignon California | 11 | 46 | 11234 | 1410770 | 1117174 | Leah Guidarelli | 2025-06-06 00:00:00
556913 | | WAGNER METRO 2025 | Off Premises | 2025-08-22 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | POPS LIQUOR | 256 LONG BEACH RD | ISLAND PARK | NEW YORK | 11558 | (516) 431-0025 | | Long Island | Nassau | Kimberly Carlstrom | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Mer Soleil Santa Lucia Highlands Reserve Chardonnay, Mer Soleil Silver Chardonnay, Sea Sun Pinot Noir | 7 | 40 | 53909 | 1427852 | 1313303 | Leah Guidarelli | 2025-07-22 00:00:00
556593 | | WAGNER METRO 2025 | Off Premises | 2025-08-22 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | PRICE RITE | 689 OLD COUNTRY RD | DIX HILLS | NEW YORK | 11746 | (631) 549-8899 | | Long Island | Suffolk | Reyna Caraballo | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Conundrum White, Sea Sun Chardonnay, Caymus Vineyards Cabernet Sauvignon California, Conundrum Red | 2 | 11 | 1382 | 1410403 | 1146347 | Leah Guidarelli | 2025-07-18 00:00:00
556737 | | WAGNER METRO 2025 | Off Premises | 2025-08-23 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | RYANN'S WINES | 1897 FRONT ST | EAST MEADOW | NEW YORK | 11554 | (516) 962-8250 | | Long Island | Nassau | Lorraine Danise-Zinga | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Emmolo Sauvignon Blanc, Caymus Vineyards Cabernet Sauvignon California, Conundrum Red | 7 | 12 | 51989 | 1409910 | 1307045 | Leah Guidarelli | 2025-07-20 00:00:00
556914 | | WAGNER METRO 2025 | Off Premises | 2025-08-23 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | POPS LIQUOR | 256 LONG BEACH RD | ISLAND PARK | NEW YORK | 11558 | (516) 431-0025 | | Long Island | Nassau | Tracy Santoro | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum White, Conundrum Red, Caymus-Suisan Walking Fool Red, Sea Sun Pinot Noir | 3 | 16 | 53909 | 1427852 | 1313303 | Leah Guidarelli | 2025-07-22 00:00:00
557484 | | WAGNER METRO 2025 | Off Premises | 2025-08-23 00:00:00 | 18:00:00 | 21:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | ALLSTAR W&L | 248-12 NORTHERN BLVD | LITTLE NECK | NEW YORK | 11362 | (718) 819-0388 | | Metro | Queens | Cindy Martinez | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum White, Conundrum Red, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Sea Sun Chardonnay, Sea Sun Pinot Noir, Emmolo Sauvignon Blanc | 9 | 18 | 44486 | | 1257485 | Leah Guidarelli | 2025-07-28 00:00:00
549976 | | WAGNER METRO 2025 | Off Premises | 2025-08-29 00:00:00 | 15:00:00 | 18:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | INTERNATIONAL WINE G | 270 NASSAU BLVD | GARDEN CITY | NEW YORK | 11530 | (516) 486-3383 | | Long Island | Nassau | Alyssa Maltz | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Sea Sun Pinot Noir, Mer Soleil Santa Lucia Highlands Reserve Chardonnay, Caymus-Suisan Walking Fool Red, Caymus Vineyards Cabernet Sauvignon California | 12 | 20 | 56699 | 1409803 | 1015845 | Leah Guidarelli | 2025-05-27 00:00:00
556484 | | WAGNER METRO 2025 | Off Premises | 2025-08-29 00:00:00 | 15:00:00 | 18:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | K H & H/LONG ISLAND CITY LIQ | 3250 VERNON BLVD | LONG ISLAND CITY | NEW YORK | 11106 | (718) 267-2992 | | Metro | Queens | Mary Scocozza | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Mer Soleil Santa Lucia Highlands Reserve Chardonnay, Sea Sun Pinot Noir, Caymus Vineyards Cabernet Sauvignon California | 15 | 50 | 17009 | 2042240 | 1166978 | Leah Guidarelli | 2025-07-17 00:00:00
554869 | | WAGNER UNY OFF 2025 | Off Premises | 2025-08-29 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | B&R WINE & LIQUOR | 153 STATE ROUTE 94 SOUTH | WARWICK | NEW YORK | 10990 | (845) 988-5190 | | Hudson Valley/Rockland | | Alaina Storck | 1 | 238 | 0 | 0 | 0 | 0 | 3.56 | 0 | 241.56 | Mer Soleil Chardonnay Reserve Monterey, Emmolo Sauvignon Blanc, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Caymus Vineyards Cabernet Sauvignon California | 6 | 10 | 11906 | 5095971 | 2008273 | Kimberly Danielewicz | 2025-07-02 00:00:00
556910 | | WAGNER METRO 2025 | Off Premises | 2025-08-29 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | EAST CHELSEA SPIRITS INC / LIQUOR UP & WINE DOWN | 383 FIRST AVE | NEW YORK | NEW YORK | 10010 | (646) 964-4173 | | Metro | New York | Russell Marisak | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Emmolo Sauvignon Blanc, Sea Sun Chardonnay, Sea Sun Pinot Noir, Conundrum White | 18 | 24 | 53548 | 762812 | 1308045 | Leah Guidarelli | 2025-07-22 00:00:00
554824 | | WAGNER METRO 2025 | Off Premises | 2025-08-30 00:00:00 | 12:30:00 | 15:30:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | BOTTLE VALUES | 734 OLD BETHPAGE RD | BETHPAGE | NEW YORK | 11804 | (516) 420-1000 | | Long Island | Nassau | Lidia Rodriguez | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Conundrum White, Conundrum Red, Caymus Vineyards Cabernet Sauvignon California | 64 | 20 | 36375 | | 1253952 | Leah Guidarelli | 2025-07-02 00:00:00
556594 | | WAGNER METRO 2025 | Off Premises | 2025-08-30 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | PRICE RITE | 689 OLD COUNTRY RD | DIX HILLS | NEW YORK | 11746 | (631) 549-8899 | | Long Island | Suffolk | Helena Diringerova | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Conundrum White, Sea Sun Chardonnay, Caymus Vineyards Cabernet Sauvignon California, Conundrum Red | 16 | 14 | 1382 | 1410403 | 1146347 | Leah Guidarelli | 2025-07-18 00:00:00
560090 | | WAGNER METRO 2025 | Off Premises | 2025-08-31 00:00:00 | 11:00:00 | 15:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | STEW LEONARDS (YONKERS) | 1 STEW LEONARD DRIVE,STORE 2 | YONKERS | NEW YORK | 10710 | (914) 375-4713 | | Long Island | Westchester | Camilla Ivy | 1 | 317 | 0 | 0 | 0 | 0 | 0 | 0 | 317 | Conundrum White, Caymus Vineyards Cabernet Sauvignon California, Emmolo Sauvignon Blanc, Mer Soleil Santa Lucia Highlands Reserve Chardonnay | 17 | 29 | 2449 | 1488058 | 1051208 | Leah Guidarelli | 2025-08-20 00:00:00
559646 | | WAGNER METRO 2025 | Off Premises | 2025-09-05 00:00:00 | 14:00:00 | 17:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | BROADWAY LIQUORS & WINES WAREHOUSE | 5790 BROADWAY | BRONX | NEW YORK | 10463 | (347) 843-8329 | | Metro | Bronx | Yahaira Maldonado | 1 | 238 | 0 | 0 | 0 | 0 | 5.2 | 0 | 243.2 | Bonanza Cabernet Sauvignon Lot 8 California, Emmolo Sauvignon Blanc, Conundrum White | 13 | 25 | 50730 | | 1296935 | Leah Guidarelli | 2025-08-15 00:00:00
561355 | | WAGNER METRO 2025 | Off Premises | 2025-09-05 00:00:00 | 15:00:00 | 18:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | BAYSHORE DISCOUNT LIQUOR INC | 567 E MAIN ST | BAYSHORE | NEW YORK | 11706 | | | Long Island | Suffolk | Rachel Tufano | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Conundrum Red, Caymus-Suisan Walking Fool Red, Mer Soleil Chardonnay Silver Unoaked California | 3 | 15 | 65850 | | 6054695 | Leah Guidarelli | 2025-09-02 00:00:00
556915 | | WAGNER METRO 2025 | Off Premises | 2025-09-05 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | POPS LIQUOR | 256 LONG BEACH RD | ISLAND PARK | NEW YORK | 11558 | (516) 431-0025 | | Long Island | Nassau | Kimberly Carlstrom | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Mer Soleil Santa Lucia Highlands Reserve Chardonnay, Mer Soleil Silver Chardonnay, Caymus Vineyards Cabernet Sauvignon California, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7 | 8 | 48 | 53909 | 1427852 | 1313303 | Leah Guidarelli | 2025-07-22 00:00:00
558045 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-09-10 00:00:00 | 17:30:00 | 20:30:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | MICHAEL TOWNE WINE & SPIRITS / CLARK ST | 100 HENRY ST AKA 73 CLARK ST | BROOKLYN | NEW YORK | 11201 | (718) 875-3667 | | Metro | Brooklyn | Alan Bemben | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus Vineyards Cabernet Sauvignon California, Caymus-Suisan Walking Fool Red, Sea Sun Pinot Noir, Emmolo Sauvignon Blanc | 2 | 15 | 451 | 767834 | 1107582 | Leah Guidarelli | 2025-07-31 00:00:00
543077 | | WAGNER UNY OFF 2025 | Off Premises | 2025-09-13 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | CHM LIQUORS (COSTCO) | 345 WESTFALL RD | ROCHESTER | NEW YORK | 14620 | (585) 292-0007 | | Rochester | | Kim Palumbo | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Caymus-Suisan Walking Fool Red, Conundrum White, Conundrum Red, Caymus California Paso Robles Cabernet Sauvignon | 23 | 27 | 52983 | | 3160519 | Jadyn Siuta | 2025-04-07 00:00:00
561318 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-09-19 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | TERRACE LIQUORS (876 E CONNETQUOT AVENUE) | 876 E CONNETQUOT AVENUE | ISLIP TERRACE | NEW YORK | 11752 | (631) 650-9400 | | Long Island | Suffolk | Sarah (Seyeda) Singh | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Bonanza Cabernet Sauvignon Lot 8 California, Bonanza Chardonnay Lot 1 California | 19 | 35 | 40968 | | 1265546 | Leah Guidarelli | 2025-08-29 00:00:00
551189 | | WAGNER UNY OFF 2025 **\*MUST DISPLAY REBATE IN FRAME ON TABLE\*\*** | Off Premises | 2025-09-19 00:00:00 | 15:00:00 | 18:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | EASTWAY LIQUOR | 1217 BAY ROAD | WEBSTER | NEW YORK | | (585) 671-4594 | | Rochester | | Ellen Muto | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Conundrum White, Mer Soleil Santa Lucia Highlands Reserve Chardonnay, Caymus Vineyards Cabernet Sauvignon California | 10 | 25 | 12215 | 1409560 | | Kimberly Danielewicz | 2025-06-04 00:00:00
562260 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-09-19 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | GRAM WINE & LIQUORS | 1207 MIDDLE COUNTRY RD | MIDDLE ISLAND | NEW YORK | 11953 | (631) 924-0127 | | Long Island | Suffolk | Katelyn Apicella | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Bonanza Chardonnay Lot 1 California, Caymus Vineyards Cabernet Sauvignon Napa Valley, Caymus-Suisan Walking Fool Red | 2 | 17 | 50278 | 1893909 | 1299468 | Allison Ackerman | 2025-09-09 00:00:00
562265 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-09-19 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | WEST ISLIP W & L | 486 UNION BLVD. | WEST ISLIP | NEW YORK | 11795 | (631) 661-4443 | | Long Island | Suffolk | Rachel Tufano | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus Vineyards Cabernet Sauvignon California, Caymus Vineyards Cabernet Sauvignon Napa Valley, Caymus-Suisan Walking Fool Red, Bonanza Cabernet Sauvignon Lot 8 California | 12 | 24 | 1857 | 1410766 | 1046156 | Allison Ackerman | 2025-09-09 00:00:00
562287 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-09-19 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | SWIFTWAY WINE & LIQUOR | 1604 ROUTE 112 | MEDFORD | NEW YORK | 11763 | (631) 654-8000 | | Long Island | Suffolk | Anastasia Smith | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus-Suisan Walking Fool Red, Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Bonanza Chardonnay Lot 1 California | 10 | 22 | 1819 | 1410618 | 1150730 | Allison Ackerman | 2025-09-09 00:00:00
562291 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-09-19 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | FIGARI'S LIQUOR STOR | 120 E MAIN ST | SMITHTOWN | NEW YORK | 11787 | (631) 265-1020 | | Long Island | Suffolk | Hahn Pugliese | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet Sauvignon Lot 8 California, Bonanza Chardonnay Lot 1 California, Conundrum Red, Caymus Vineyards Cabernet Sauvignon Napa Valley | 4 | 15 | 61531 | 764601 | 1300279 | Allison Ackerman | 2025-09-09 00:00:00
562298 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-09-19 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | AJ7 WINE & LIQUOR CORP | 172B GARDINERS AVE | LEVITTOWN | NEW YORK | 11756 | (516) 470-0278 | | Long Island | Nassau | Cathy DiPietro | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Caymus Vineyards Cabernet Sauvignon Napa Valley, Bonanza Cabernet Sauvignon Lot 8 California, Caymus Vineyards Cabernet Sauvignon California | 3 | 25 | 33842 | 1409313 | 1249897 | Allison Ackerman | 2025-09-09 00:00:00
559714 | | WAGNER METRO 2025 **\*VIP WINE EVENT\*\*** | Off Premises | 2025-09-19 00:00:00 | 16:30:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | STEW LEONARDS (YONKERS) | 1 STEW LEONARD DRIVE,STORE 2 | YONKERS | NEW YORK | 10710 | (914) 375-4713 | | Long Island | Westchester | Camilla Ivy | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Caymus Vineyards Cabernet Sauvignon Napa Valley, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Caymus Vineyards Cabernet Sauvignon California | 18 | 42 | 2449 | 1488058 | 1051208 | Leah Guidarelli | 2025-08-15 00:00:00
556917 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-09-19 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | PRICE RITE | 689 OLD COUNTRY RD | DIX HILLS | NEW YORK | 11746 | (631) 549-8899 | | Long Island | Suffolk | Helena Diringerova | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum White, Conundrum Red, Caymus Vineyards Cabernet Sauvignon California, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Sea Sun Chardonnay | 16 | 17 | 1382 | 1410403 | 1146347 | Leah Guidarelli | 2025-07-22 00:00:00
560091 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-09-20 00:00:00 | 12:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | STEW LEONARDS (YONKERS) | 1 STEW LEONARD DRIVE,STORE 2 | YONKERS | NEW YORK | 10710 | (914) 375-4713 | | Long Island | Westchester | Camilla Ivy | 1 | 317 | 0 | 0 | 0 | 0 | 0 | 0 | 317 | Conundrum White, Mer Soleil Santa Lucia Highlands Reserve Chardonnay, Caymus-Suisan Walking Fool Red, Sea Sun Pinot Noir | 19 | 30 | 2449 | 1488058 | 1051208 | Leah Guidarelli | 2025-08-20 00:00:00
551864 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-09-20 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | CAPPY'S WAREHOUSE W & S I | 670 MERRICK RD | LYNBROOK | NEW YORK | 11580 | (516) 256-0444 | | Long Island | Nassau | Angela Soviero | 1 | 238 | 0 | 0 | 0 | 0 | 3.25 | 0 | 241.25 | Emmolo Merlot, Emmolo Sauvignon Blanc, Conundrum White, Caymus Vineyards Cabernet Sauvignon California, Conundrum Red, Mer Soleil Santa Lucia Highlands Reserve Chardonnay | 13 | 20 | 16991 | 2042220 | 1174230 | Leah Guidarelli | 2025-06-10 00:00:00
562294 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-09-20 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | YM LIQUORS & WINES | 67 RTE 111 | SMITHTOWN | NEW YORK | 11787 | (631) 265-1121 | | Long Island | Suffolk | Mark Wetzler | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Red Schooner Transit 1, Caymus-Suisan Walking Fool Red, Caymus-Suisan Grand Durif | 2 | 25 | 57162 | | 1316944 | Allison Ackerman | 2025-09-09 00:00:00
559647 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-09-20 00:00:00 | 14:00:00 | 17:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | BROADWAY LIQUORS & WINES WAREHOUSE | 5790 BROADWAY | BRONX | NEW YORK | 10463 | (347) 843-8329 | | Metro | Bronx | Rosa Orzuna | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Sea Sun Pinot Noir, Caymus Vineyards Cabernet Sauvignon California, Conundrum Red | 29 | 50 | 50730 | | 1296935 | Leah Guidarelli | 2025-08-15 00:00:00
562272 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-09-26 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | POPE LIQUORS, INC. | 2799 D.RTE.112 | MEDFORD | NEW YORK | 11763 | (631) 289-1660 | | Long Island | Suffolk | Brianne Garbett | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Mer Soleil Chardonnay Reserve Monterey, Caymus-Suisan Walking Fool Red, Bonanza Chardonnay Lot 1 California | 7 | 32 | 1557 | 1410336 | 1046069 | Allison Ackerman | 2025-09-09 00:00:00
562275 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-09-26 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | RYANN'S WINES | 1897 FRONT ST | EAST MEADOW | NEW YORK | 11554 | (516) 962-8250 | | Long Island | Nassau | Stacy Del Ponte | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Emmolo Sauvignon Blanc, Mer Soleil Chardonnay Reserve Monterey, Caymus Vineyards Cabernet Sauvignon Napa Valley, Conundrum White | 5 | 22 | 51989 | 1409910 | 1307045 | Allison Ackerman | 2025-09-09 00:00:00
562830 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-09-26 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | CORTELYOU WINE & LIQUOR CO (CORTELYOU STATION) | 1524 CORTELYOU RD | BROOKLYN | NEW YORK | 11226 | (718) 284-4321 | | Metro | Brooklyn | Shannon Barnes | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus Vineyards Cabernet Sauvignon Napa Valley, Caymus-Suisan Walking Fool Red, Bonanza Cabernet Sauvignon Lot 8 California | 2 | 22 | 54116 | 1409440 | 1313242 | Leah Guidarelli | 2025-09-12 00:00:00
562831 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-09-26 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | WINE MARKET OF NEW HYDE P | 2337 NEW HYDE PARK RD | NEW HYDE PARK | NEW YORK | 11040 | (516) 328-8800 | | Long Island | Nassau | Diana Cervi Suppa | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus-Suisan Grand Durif, Emmolo Merlot, Bonanza Chardonnay Lot 1 California | 3 | 15 | 16477 | 2016841 | 1171509 | Leah Guidarelli | 2025-09-12 00:00:00
562965 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-09-26 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | WESTBURY LIQUORS | 1250 OLD COUNTRY RD | WESTBURY | NEW YORK | 11590 | (516) 832-8602 | | Long Island | Nassau | Kimberly Carlstrom | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Sea Sun Pinot Noir, Conundrum White | 10 | 35 | 11234 | 1410770 | 1117174 | Leah Guidarelli | 2025-09-12 00:00:00
563557 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-09-26 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | FULI WINE & LIQUOR/TG WINE & LIQUOR | 14 JERICHO TPKE | JERICHO | NEW YORK | 11753 | (516) 493-9200 | | Long Island | Nassau | Paige Pagano | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus Vineyards Cabernet Sauvignon Napa Valley, Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Sea Sun Pinot Noir, Caymus Vineyards Cabernet Sauvignon California | 1 | 10 | 47957 | 3350201 | 1291908 | Jodi Brooks | 2025-09-17 00:00:00
564298 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-09-26 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | WAVERLY LIQUOR | 172 RTE 25A | EAST SETAUKET | NEW YORK | 11733 | (631) 941-3103 | | Long Island | Suffolk | Tania Ehrlich | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Caymus-Suisan Grand Durif, Bonanza Chardonnay Lot 1 California | 4 | 22 | 2307 | 1410750 | 1046019 | Allison Ackerman | 2025-09-23 00:00:00
562529 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-09-26 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | 1936 WINE & SPIRITS | 65 E 34TH ST | NEW YORK | NEW YORK | 10016 | (212) 686-8899 | | Metro | New York | Jasmine Spiess | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Chardonnay Lot 1 California, Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Bonanza Cabernet Sauvignon Lot 8 California | 4 | 52 | 61926 | | 1338999 | Leah Guidarelli | 2025-09-10 00:00:00
563283 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-09-26 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | ALLSTAR W&L | 248-12 NORTHERN BLVD | LITTLE NECK | NEW YORK | 11362 | (718) 819-0388 | | Metro | Queens | Cindy Martinez | 1 | 238 | 0 | 0 | 0 | 0 | 3.67 | 0 | 241.67 | Sea Sun Pinot Noir, Conundrum Red, Mer Soleil Santa Lucia Highlands Reserve Chardonnay, Red Schooner Transit 2, Emmolo Sauvignon Blanc, Bonanza Cabernet Sauvignon Lot 8 California | 2 | 10 | 44486 | | 1257485 | Leah Guidarelli | 2025-09-16 00:00:00
563088 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-09-27 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | THE WINE GUY | 220 WEST MAIN ST | SMITHTOWN | NEW YORK | 11787 | (631) 780-6200 | | Long Island | Suffolk | Kristina Catalanotto | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Emmolo Merlot, Caymus Vineyards Cabernet Sauvignon Napa Valley, Caymus Vineyards Cabernet Sauvignon California | 15 | 70 | 29995 | | 1238884 | Leah Guidarelli | 2025-09-13 00:00:00
562589 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-09-27 00:00:00 | 14:00:00 | 17:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | BELLA WINE & SPIRITS | 91 ELLIS ST | STATEN ISLAND | NEW YORK | 10307 | (716) 489-8345 | | Metro | Staten Island | Arin Cacciolo | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum White, Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Conundrum Red, Bonanza Cabernet Sauvignon Lot 8 California | 7 | 35 | | | | Leah Guidarelli | 2025-09-10 00:00:00
562663 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-09-27 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | WINEMASTERS | 499 MONTAUK HIGHWAY | BABYLON | NEW YORK | 11702 | (631) 669-0049 | | Long Island | Suffolk | Rachel Tufano | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus Vineyards Cabernet Sauvignon California, Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Emmolo Merlot, Bonanza Chardonnay Lot 1 California | 5 | 22 | 2054 | 1445819 | 1155508 | Leah Guidarelli | 2025-09-10 00:00:00
562960 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-09-27 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | NC LL 138 WINE & LIQUOR INC **_SPANISH SPEAKER_** | 138 HEYWARD ST | BRENTWOOD | NEW YORK | 11717 | (631) 273-6020 | | Long Island | Suffolk | Olga Zuluaga | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus Vineyards Cabernet Sauvignon California, Emmolo Merlot, Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley | 2 | 22 | 53044 | | 1305670 | Leah Guidarelli | 2025-09-12 00:00:00
563609 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-09-28 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | STEW LEONARD'S / VINEYARDS OF FARMINGDALE | 210 AIRPORT PLAZA | FARMINGDALE | NEW YORK | 11735 | (631) 249-3611 | | Long Island | Suffolk | Rachel Tufano | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum White, Conundrum Red, Emmolo Sauvignon Blanc, Bonanza Cabernet Sauvignon Lot 8 California | 7 | 25 | 1777 | 1732052 | 1127678 | Leah Guidarelli | 2025-09-17 00:00:00
556916 | | WAGNER METRO 2025 | Off Premises | 2025-09-28 00:00:00 | 14:00:00 | 17:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | PRICE RITE | 689 OLD COUNTRY RD | DIX HILLS | NEW YORK | 11746 | (631) 549-8899 | | Long Island | Suffolk | Melanie DiSilvestre | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum White, Conundrum Red, Caymus Vineyards Cabernet Sauvignon California, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Sea Sun Chardonnay | 12 | 26 | 1382 | 1410403 | 1146347 | Leah Guidarelli | 2025-07-22 00:00:00
564338 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-10-03 00:00:00 | 14:00:00 | 17:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | BROADWAY LIQUORS & WINES WAREHOUSE | 5790 BROADWAY | BRONX | NEW YORK | 10463 | (347) 843-8329 | | Metro | Bronx | Dorothy kaufman | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Emmolo Sauvignon Blanc, Emmolo Merlot, Bonanza Cabernet Sauvignon Lot 8 California, Red Schooner Voyage 12 | 6 | 22 | 50730 | | 1296935 | Leah Guidarelli | 2025-09-24 00:00:00
560092 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-10-03 00:00:00 | 16:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | STEW LEONARDS (YONKERS) | 1 STEW LEONARD DRIVE,STORE 2 | YONKERS | NEW YORK | 10710 | (914) 375-4713 | | Long Island | Westchester | Camilla Ivy | 1 | 317 | 0 | 0 | 0 | 0 | 0 | 0 | 317 | Conundrum Red, Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Bonanza Chardonnay Lot 1 California, Red Schooner Voyage 12 | 36 | 25 | 2449 | 1488058 | 1051208 | Leah Guidarelli | 2025-08-20 00:00:00
562247 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-10-03 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | CAPPY'S WAREHOUSE W & S I | 670 MERRICK RD | LYNBROOK | NEW YORK | 11580 | (516) 256-0444 | | Long Island | Nassau | Angela Soviero | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Bonanza Chardonnay Lot 1 California, Red Schooner Voyage 12, Caymus Vineyards Cabernet Sauvignon Napa Valley | 11 | 20 | 16991 | 2042220 | 1174230 | Allison Ackerman | 2025-09-09 00:00:00
562278 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-10-03 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | RYANN'S WINES | 1897 FRONT ST | EAST MEADOW | NEW YORK | 11554 | (516) 962-8250 | | Long Island | Nassau | Ann Battistelli | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus-Suisan Walking Fool Red, Caymus Vineyards Cabernet Sauvignon Napa Valley, Emmolo Sauvignon Blanc, Caymus Vineyards Cabernet Sauvignon California, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7 | 9 | 15 | 51989 | 1409910 | 1307045 | Allison Ackerman | 2025-09-09 00:00:00
562296 | | WAGNER METRO 2025 \*(CANCELLED UPON ARRIVAL) | Off Premises | 2025-10-03 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | LIQUORIUM | 430-04 NORTH COUNTRY RD | SAINT JAMES | NEW YORK | 11780 | (631) 862-7020 | | Long Island | Suffolk | Tania Ehrlich | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet Sauvignon Lot 8 California, Bonanza Chardonnay Lot 1 California, Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Emmolo Merlot | 0 | 0 | 46104 | 1409746 | 1284694 | Allison Ackerman | 2025-09-09 00:00:00
562963 | | WAGNER METRO 2025 \***REBATE\*** | Off Premises | 2025-10-03 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | K & D LIQUORS, INC. | 1343 MADISON AVE | NEW YORK | NEW YORK | 10128 | (212) 289-1818 | | Metro | New York | Joseph Carestia | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus Vineyards Cabernet Sauvignon Napa Valley, Mer Soleil Santa Lucia Highlands Reserve Chardonnay, Caymus-Suisan Grand Durif | 13 | 39 | 993 | 1409876 | 1023841 | Leah Guidarelli | 2025-09-12 00:00:00
564506 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-10-03 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | WINE MARKET OF NEW HYDE P | 2337 NEW HYDE PARK RD | NEW HYDE PARK | NEW YORK | 11040 | (516) 328-8800 | | Long Island | Nassau | Angela DeMauro | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Chardonnay Lot 1 California, Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Bonanza Cabernet Sauvignon Lot 8 California | 3 | 18 | 16477 | 2016841 | 1171509 | Leah Guidarelli | 2025-09-25 00:00:00
564504 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-10-03 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | 5 STAR WINE & LIQUORS | 59 12 WOODSIDE AVE | WOODSIDE | NEW YORK | 11377 | (718) 779-1800 | | Metro | Queens | Marinela Mesa | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Emmolo Sauvignon Blanc, Emmolo Merlot, Caymus-Suisan Walking Fool Red | 2 | 25 | 42458 | 1485505 | 1272682 | Leah Guidarelli | 2025-09-25 00:00:00
564505 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-10-03 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | PAVILLION WINE | 361 S OYSTER BAY RD | PLAINVIEW | NEW YORK | 11803 | (516) 433-0303 | | Long Island | Nassau | Lisa Lidonnici | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Chardonnay Lot 1 California, Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7 | 13 | 25 | 23602 | 3719640 | 1225147 | Leah Guidarelli | 2025-09-25 00:00:00
564507 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-10-03 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | MANGROVE W&L/VALLEY STREAM | 263 W. MERRICK RD | VALLEY STREAM | NEW YORK | 11580 | (516) 568-9463 | | Long Island | Nassau | Sandra Verene | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum Red, Emmolo Sauvignon Blanc, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7 | 15 | 19 | 1296 | 1410697 | 1015927 | Leah Guidarelli | 2025-09-25 00:00:00
564508 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-10-03 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | PRIMETIME LIQUORS CORP | 427 5TH AVE | BROOKLYN | NEW YORK | 11215 | (718) 788-8181 | | Metro | Brooklyn | Iris Fels | 1 | 238 | 0 | 0 | 0 | 0 | 4.15 | 0 | 242.15 | Caymus Vineyards Cabernet Sauvignon Napa Valley, Caymus-Suisan Grand Durif | 2 | 20 | 24029 | | 1230892 | Leah Guidarelli | 2025-09-25 00:00:00
562297 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-10-04 00:00:00 | 12:00:00 | 15:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | THE WINE GUY | 220 WEST MAIN ST | SMITHTOWN | NEW YORK | 11787 | (631) 780-6200 | | Long Island | Suffolk | Kristina Catalanotto | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Bonanza Chardonnay Lot 1 California, Bonanza Cabernet Sauvignon Lot 8 California | 14 | 30 | 29995 | | 1238884 | Allison Ackerman | 2025-09-09 00:00:00
564502 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-10-04 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | WHISKEY & WINE OFF 69 | 1321 2ND AVE | NEW YORK | NEW YORK | 10021 | (212) 585-0005 | | Metro | New York | Russell Marisak | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Chardonnay Lot 1 California, Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Bonanza Cabernet Sauvignon Lot 8 California | 4 | 20 | 41825 | | 1270388 | Leah Guidarelli | 2025-09-25 00:00:00
543078 | | WAGNER UNY OFF 2025 **\*MUST DISPLAY REBATE IN FRAME ON TABLE\*\*** | Off Premises | 2025-10-10 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | CHM LIQUORS (COSTCO) | 345 WESTFALL RD | ROCHESTER | NEW YORK | 14620 | (585) 292-0007 | | Rochester | | Julie Piccirillo | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Caymus-Suisan Walking Fool Red, Conundrum White, Conundrum Red, Caymus California Paso Robles Cabernet Sauvignon | 13 | 20 | 52983 | | 3160519 | Jadyn Siuta | 2025-04-07 00:00:00
562269 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-10-10 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | LAKE LIQUOR, INC. | 299-2 HAWKINS AVE | RONKONKOMA | NEW YORK | 11779 | (631) 585-6100 | | Long Island | Suffolk | Mary Infante | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet Sauvignon Lot 8 California, Mer Soleil Chardonnay Reserve Monterey, Caymus Vineyards Cabernet Sauvignon Napa Valley, Conundrum White | 10 | 22 | 1513 | 1427676 | 1046113 | Allison Ackerman | 2025-09-09 00:00:00
562274 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-10-10 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | SUN WAVE LIQUOR INC. | 412 SUNRISE HWY W | PATCHOGUE | NEW YORK | 11772 | (631) 475-2226 | | Long Island | Suffolk | Nicole Benincasa | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Mer Soleil Chardonnay Reserve Monterey, Caymus Vineyards Cabernet Sauvignon Napa Valley, Bonanza Chardonnay Lot 1 California, Sea Sun Chardonnay | 6 | 30 | 1598 | 1410609 | 1046099 | Allison Ackerman | 2025-09-09 00:00:00
562295 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-10-10 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | LIQUORIUM | 430-04 NORTH COUNTRY RD | SAINT JAMES | NEW YORK | 11780 | (631) 862-7020 | | Long Island | Suffolk | Mark Wetzler | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum Red, Conundrum White, Emmolo Merlot, Caymus Vineyards Cabernet Sauvignon California | 7 | 28 | 46104 | 1409746 | 1284694 | Allison Ackerman | 2025-09-09 00:00:00
556918 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-10-10 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | PRICE RITE | 689 OLD COUNTRY RD | DIX HILLS | NEW YORK | 11746 | (631) 549-8899 | | Long Island | Suffolk | Helena Diringerova | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum White, Conundrum Red, Caymus Vineyards Cabernet Sauvignon California, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Sea Sun Chardonnay | 13 | 17 | 1382 | 1410403 | 1146347 | Leah Guidarelli | 2025-07-22 00:00:00
564503 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-10-10 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | WHISKEY & WINE OFF 69 | 1321 2ND AVE | NEW YORK | NEW YORK | 10021 | (212) 585-0005 | | Metro | New York | Russell Marisak | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus Vineyards Cabernet Sauvignon Napa Valley, Caymus Vineyards Cabernet Sauvignon California | 1 | 21 | 41825 | | 1270388 | Leah Guidarelli | 2025-09-25 00:00:00
563610 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-10-11 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | STEW LEONARD'S / VINEYARDS OF FARMINGDALE | 210 AIRPORT PLAZA | FARMINGDALE | NEW YORK | 11735 | (631) 249-3611 | | Long Island | Suffolk | Heather Reis | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Sea Sun Pinot Noir, Mer Soleil Silver Chardonnay, Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Bonanza Cabernet Sauvignon Lot 8 California | 13 | 30 | 1777 | 1732052 | 1127678 | Leah Guidarelli | 2025-09-17 00:00:00
562271 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-10-11 00:00:00 | 15:00:00 | 18:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | QUENCH WINE & SPIRITS | 217 WAVERLY AVE | PATCHOGUE | NEW YORK | | (631) 569-2574 | | Long Island | Suffolk | Rosemary Gledhill | 1 | 238 | 0 | 0 | 0 | 0 | 3.69 | 0 | 241.69 | Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Mer Soleil Chardonnay Reserve Monterey, Caymus Vineyards Cabernet Sauvignon Napa Valley, Bonanza Chardonnay Lot 1 California | 3 | 25 | 57675 | 1410720 | 1332316 | Allison Ackerman | 2025-09-09 00:00:00
562665 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-10-11 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | WINE WAREHOUSE | 816 CARMANS AVE | WESTBURY | NEW YORK | 11590 | (516) 333-9463 | | Long Island | Nassau | Yvette Campo | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus Vineyards Cabernet Sauvignon Napa Valley, Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Emmolo Merlot, Bonanza Chardonnay Lot 1 California | 5 | 28 | 38372 | | 1260435 | Leah Guidarelli | 2025-09-10 00:00:00
564509 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-10-11 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | CORTELYOU WINE & LIQUOR CO (CORTELYOU STATION) | 1524 CORTELYOU RD | BROOKLYN | NEW YORK | 11226 | (718) 284-4321 | | Metro | Brooklyn | Jalynn White | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus-Suisan Walking Fool Red, Caymus Vineyards Cabernet Sauvignon California, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7 | 2 | 15 | 54116 | 1409440 | 1313242 | Leah Guidarelli | 2025-09-25 00:00:00
566634 | | BOOTH#109 NYSLSA ALBANY HOLIDAY TRADE SHOW WAGNER | On Premises | 2025-10-14 00:00:00 | 14:30:00 | 19:30:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | CROWNE PLAZA/DESMOND | 660 ALBANY SHAKER RD | ALBANY | NEW YORK | | | | North Albany | | Michele Zebrowski | 1 | 396 | 0 | 0 | 0 | 0 | 0 | 0 | 396 | Bonanza Chardonnay Lot 1 California, Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Caymus Vineyards Cabernet Sauvignon California, Emmolo Sauvignon Blanc, Conundrum White | 0 | 150 | 12406 | 5146867 | 2000769 | Kimberly Danielewicz | 2025-10-10 00:00:00
565824 | | WAGNER UNY OFF 2025 **\*MUST DISPLAY REBATE IN FRAME ON TABLE\*\*** | Off Premises | 2025-10-14 00:00:00 | 17:30:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | COLONIAL WINE & SPIRITS (ORCHARD PARK/BUFFALO) | 3211 SOUTHWESTERN BLVD | ORCHARD PARK | NEW YORK | 14127 | (716) 674-3736 | | Buffalo | | Mary Ann Jolls | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus-Suisan Walking Fool Red, Conundrum White, Caymus Vineyards Cabernet Sauvignon California, Bonanza Chardonnay Lot 1 California, Conundrum Red Wine Carly Pearce Edition California | 10 | 45 | 12232 | 1741907 | 3115754 | Kimberly Danielewicz | 2025-10-03 00:00:00
563142 | | WAGNER UNY OFF 2025 **\*MUST DISPLAY REBATE IN FRAME ON TABLE\*\*** | Off Premises | 2025-10-15 00:00:00 | 17:30:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | GLOBAL WINE & SPIRITS | 4974 HARLEM ROAD | AMHERST | NEW YORK | | (716) 839-4515 | | Buffalo | | Kathleen Middione | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Chardonnay Lot 1 California, Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Caymus Vineyards Cabernet Sauvignon Napa Valley, Mer Soleil Chardonnay Reserve Monterey, Paul Jaboulet Aîné Parallèle 45 Côtes-du-Rhône Rouge | 22 | 100 | 12165 | 1409600 | 3109943 | Kimberly Danielewicz | 2025-09-14 00:00:00
566635 | | BOOTH#109 NYSLSA BUFFALO HOLIDAY TRADE SHOW WAGNER | On Premises | 2025-10-16 00:00:00 | 14:30:00 | 19:30:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | BUFFALO RIVERWORKS | 333 GANSON ST | BUFFALO | NEW YORK | 14203 | | | Buffalo | | Marylis McGrath | 1 | 396 | 0 | 0 | 0 | 0 | 0 | 0 | 396 | Bonanza Chardonnay Lot 1 California, Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Caymus Vineyards Cabernet Sauvignon California, Emmolo Sauvignon Blanc, Conundrum White | 0 | 100 | 44645 | | 3155195 | Kimberly Danielewicz | 2025-10-10 00:00:00
563089 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-10-17 00:00:00 | 12:00:00 | 15:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | THE WINE GUY | 220 WEST MAIN ST | SMITHTOWN | NEW YORK | 11787 | (631) 780-6200 | | Long Island | Suffolk | Tania Ehrlich | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet Sauvignon Lot 8 California, Sea Sun Chardonnay, Conundrum Red, Caymus Vineyards Cabernet Sauvignon Napa Valley | 6 | 35 | 29995 | | 1238884 | Leah Guidarelli | 2025-09-13 00:00:00
565702 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-10-17 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | TERRACE LIQUORS (876 E CONNETQUOT AVENUE) | 876 E CONNETQUOT AVENUE | ISLIP TERRACE | NEW YORK | 11752 | (631) 650-9400 | | Long Island | Suffolk | Sarah (Seyeda) Singh | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus-Suisan Walking Fool Red, Bonanza Cabernet Sauvignon Lot 8 California, Bonanza Chardonnay Lot 1 California | 11 | 35 | 40968 | | 1265546 | Leah Guidarelli | 2025-10-03 00:00:00
566427 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-10-17 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | PARK EAST LIQUORS | 1657 YORK AVE | NEW YORK | NEW YORK | 10128 | (212) 534-2093 | | Metro | New York | Reina Barnswell | 1 | 238 | 0 | 0 | 0 | 0 | 5.66 | 0 | 243.66 | Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Bonanza Cabernet Sauvignon Lot 8 California, Bonanza Chardonnay Lot 1 California | 4 | 25 | 1369 | 1427816 | 1023842 | Leah Guidarelli | 2025-10-08 00:00:00
566428 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-10-17 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | 54 WINES & SPIRITS INC/HELLS KITCHEN WINE & SPIRITS | 408 W 55TH ST | NEW YORK | NEW YORK | 10019 | (212) 757-7123 | | Metro | New York | Noor Asry Soeharman-Wivell | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Bonanza Cabernet Sauvignon Lot 8 California, Bonanza Chardonnay Lot 1 California | 4 | 27 | 50194 | 1925237 | 1297881 | Leah Guidarelli | 2025-10-08 00:00:00
560343 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-10-18 00:00:00 | 12:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | STEW LEONARDS (YONKERS) | 1 STEW LEONARD DRIVE,STORE 2 | YONKERS | NEW YORK | 10710 | (914) 375-4713 | | Long Island | Westchester | Camilla Ivy | 1 | 317 | 0 | 0 | 0 | 0 | 0 | 0 | 317 | Caymus Vineyards Cabernet Sauvignon Napa Valley, Caymus-Suisan Grand Durif, Red Schooner Voyage 12 | 29 | 45 | 2449 | 1488058 | 1051208 | Leah Guidarelli | 2025-08-21 00:00:00
562248 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-10-18 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | CAPPY'S WAREHOUSE W & S I | 670 MERRICK RD | LYNBROOK | NEW YORK | 11580 | (516) 256-0444 | | Long Island | Nassau | Robin Linderman | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet Sauvignon Lot 8 California, Bonanza Chardonnay Lot 1 California, Emmolo Merlot, Caymus Vineyards Cabernet Sauvignon Napa Valley | 14 | 30 | 16991 | 2042220 | 1174230 | Allison Ackerman | 2025-09-09 00:00:00
562281 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-10-18 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | RYANN'S WINES | 1897 FRONT ST | EAST MEADOW | NEW YORK | 11554 | (516) 962-8250 | | Long Island | Nassau | Nancy Rico | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Sea Sun Pinot Noir, Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Caymus Vineyards Cabernet Sauvignon Napa Valley, Bonanza Chardonnay Lot 1 California, Emmolo Sauvignon Blanc, Caymus Vineyards Cabernet Sauvignon California | 12 | 22 | 51989 | 1409910 | 1307045 | Allison Ackerman | 2025-09-09 00:00:00
565290 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-10-18 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | EXCELLENT WINE & LIQ | 1746 VETERANS MEMORIAL HIGHWAY | ISLANDIA | NEW YORK | | (631) 234-9300 | | Long Island | Suffolk | Mahym Tashanova | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Emmolo Sauvignon Blanc, Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Bonanza Chardonnay Lot 1 California, Caymus-Suisan Walking Fool Red | 7 | 13 | 1970 | 1485061 | | Leah Guidarelli | 2025-09-30 00:00:00
564339 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-10-18 00:00:00 | 14:00:00 | 17:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | BROADWAY LIQUORS & WINES WAREHOUSE | 5790 BROADWAY | BRONX | NEW YORK | 10463 | (347) 843-8329 | | Metro | Bronx | Yahaira Maldonado | 1 | 238 | 0 | 0 | 0 | 0 | 16.12 | 0 | 254.12 | Bonanza Cabernet Sauvignon Lot 8 California, Conundrum White, Conundrum Red, Mer Soleil Santa Lucia Highlands Reserve Chardonnay | 21 | 28 | 50730 | | 1296935 | Leah Guidarelli | 2025-09-24 00:00:00
565959 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-10-18 00:00:00 | 15:00:00 | 18:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | WINES ON MAIN | 567 MONTAUK HGWY | BAY SHORE | NEW YORK | 11706 | (631) 647-4180 | | Long Island | Suffolk | Jessica Naus | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum White, Conundrum Red, Caymus-Suisan Walking Fool Red, Bonanza Cabernet Sauvignon Lot 8 California | 3 | 15 | 65850 | 3712242 | 1221514 | Allison Ackerman | 2025-10-06 00:00:00
558046 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-10-23 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | MICHAEL TOWNE WINE & SPIRITS / CLARK ST | 100 HENRY ST AKA 73 CLARK ST | BROOKLYN | NEW YORK | 11201 | (718) 875-3667 | | Metro | Brooklyn | Jonathan Rose | 1 | 238 | 0 | 0 | 0 | 0 | 7.28 | 0 | 245.28 | Mer Soleil Silver Chardonnay, Mer Soleil Santa Lucia Highlands Reserve Chardonnay, Caymus Vineyards Cabernet Sauvignon California, Caymus-Suisan Walking Fool Red | 2 | 25 | 451 | 767834 | 1107582 | Leah Guidarelli | 2025-07-31 00:00:00
562249 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-10-24 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | CAPPY'S WAREHOUSE W & S I | 670 MERRICK RD | LYNBROOK | NEW YORK | 11580 | (516) 256-0444 | | Long Island | Nassau | Sharon Rosado | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet Sauvignon Lot 8 California, Bonanza Chardonnay Lot 1 California, Emmolo Merlot, Caymus Vineyards Cabernet Sauvignon Napa Valley, Sea Sun Pinot Noir | 12 | 26 | 16991 | 2042220 | 1174230 | Allison Ackerman | 2025-09-09 00:00:00
562288 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-10-24 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | WAVERLY LIQUOR | 172 RTE 25A | EAST SETAUKET | NEW YORK | 11733 | (631) 941-3103 | | Long Island | Suffolk | Elizabeth Lutjen | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Bonanza Chardonnay Lot 1 California, Bonanza Cabernet Sauvignon Lot 8 California, Caymus-Suisan Walking Fool Red | 5 | 18 | 2307 | 1410750 | 1046019 | Allison Ackerman | 2025-09-09 00:00:00
563258 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-10-24 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | HAMPTON BAYS W & S | 46 E. MONTAUK HIGHWAY | HAMPTON BAYS | NEW YORK | 11946 | (631) 728-8595 | | Long Island | Suffolk | Diana Kozic | 1 | 278 | 0 | 0 | 0 | 0 | 0 | 0 | 278 | Sea Sun Chardonnay, Caymus-Suisan Grand Durif, Mer Soleil Santa Lucia Highlands Reserve Chardonnay, Emmolo Merlot | 7 | 20 | 2025 | 1788747 | 1138987 | Leah Guidarelli | 2025-09-15 00:00:00
566090 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-10-24 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | THE SPIRIT LOCKER | 1257 VETERANS HWY | HAUPPAUGE | NEW YORK | 11788 | (631) 724-7436 | | Long Island | Suffolk | Christine Powell | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus Vineyards Cabernet Sauvignon California, Bonanza Cabernet Sauvignon Lot 8 California, Bonanza Chardonnay Lot 1 California | 8 | 20 | 801 | 1757410 | 1046145 | Leah Guidarelli | 2025-10-07 00:00:00
567647 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-10-24 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | RYE BROOK WINE & SPIRIT S | 259 S RIDGE STREET | RYE BROOK | NEW YORK | | (914) 939-7511 | | Long Island | Westchester | Jodie Marin | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Bonanza Cabernet Sauvignon Lot 8 California, Caymus Vineyards Cabernet Sauvignon California, Caymus-Suisan Walking Fool Red | 9 | 25 | 15913 | 767004 | | Leah Guidarelli | 2025-10-18 00:00:00
562829 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-10-24 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | VERNON WINE & LIQUOR | 50 06 VERNON BLVD | LONG ISLAND CITY | NEW YORK | 11101 | (718) 784-5096 | | Metro | Queens | Jasmine Spiess | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus-Suisan Walking Fool Red, Emmolo Sauvignon Blanc, Emmolo Merlot | 7 | 44 | 46883 | 1428068 | 1287410 | Leah Guidarelli | 2025-09-12 00:00:00
563611 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-10-25 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | STEW LEONARD'S / VINEYARDS OF FARMINGDALE | 210 AIRPORT PLAZA | FARMINGDALE | NEW YORK | 11735 | (631) 249-3611 | | Long Island | Suffolk | Olimpia Fernandez | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Sea Sun Pinot Noir, Mer Soleil Silver Chardonnay, Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Emmolo Sauvignon Blanc | 4 | 9 | 1777 | 1732052 | 1127678 | Leah Guidarelli | 2025-09-17 00:00:00
566617 | | WAGNER UNY OFF 2025 **\*MUST DISPLAY REBATE IN FRAME ON TABLE\*\*** | Off Premises | 2025-10-25 00:00:00 | 14:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | KENT WINE & LIQUOR | 1100 ROUTE 52 | CARMEL | NEW YORK | | (845) 225-1050 | | Hudson Valley/Rockland | | Courtney Pellicane | 1 | 397 | 0 | 0 | 0 | 0 | 0 | 0 | 397 | Conundrum Red, Conundrum White, Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Bonanza Chardonnay Lot 1 California, Caymus Vineyards Cabernet Sauvignon Napa Valley | 40 | 100 | 11594 | 1409891 | 2139294 | Kimberly Danielewicz | 2025-10-10 00:00:00
562286 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-10-25 00:00:00 | 15:00:00 | 18:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | SV FINE WINES | 121 ALEXANDER AVE | LAKE GROVE | NEW YORK | 11755 | (631) 724-9463 | | Long Island | Suffolk | Gabriella Jennings | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Mer Soleil Chardonnay Reserve Monterey, Caymus Vineyards Cabernet Sauvignon California, Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Bonanza Chardonnay Lot 1 California | 2 | 12 | 32891 | | 1196550 | Allison Ackerman | 2025-09-09 00:00:00
556919 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-10-25 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | PRICE RITE | 689 OLD COUNTRY RD | DIX HILLS | NEW YORK | 11746 | (631) 549-8899 | | Long Island | Suffolk | Helena Diringerova | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum White, Conundrum Red, Caymus Vineyards Cabernet Sauvignon California, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Sea Sun Chardonnay | 19 | 17 | 1382 | 1410403 | 1146347 | Leah Guidarelli | 2025-07-22 00:00:00
564526 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-10-25 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | STANT | 790 GRAND BLVD | DEER PARK | NEW YORK | 11729 | (631) 242-0318 | | Long Island | Suffolk | Rachel Tufano | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet Sauvignon Lot 8 California, Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Mer Soleil Santa Lucia Highlands Reserve Chardonnay, Conundrum Red | 5 | 12 | 28214 | | 1243300 | Leah Guidarelli | 2025-09-25 00:00:00
563612 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-10-26 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | STEW LEONARD'S / VINEYARDS OF FARMINGDALE | 210 AIRPORT PLAZA | FARMINGDALE | NEW YORK | 11735 | (631) 249-3611 | | Long Island | Suffolk | Hahn Pugliese | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet Sauvignon Lot 8 California, Mer Soleil Silver Chardonnay, Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Emmolo Sauvignon Blanc | 31 | 31 | 1777 | 1732052 | 1127678 | Leah Guidarelli | 2025-09-17 00:00:00
570066 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-11-01 00:00:00 | 11:30:00 | 14:30:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | NORDSTROMS MEN'S STORE | 235 W 57TH ST | NEW YORK | NEW YORK | 10019 | (212) 843-5100 | | Metro | New York | Thomas LaRossa | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum White, Sea Sun Pinot Noir, Caymus-Suisan Walking Fool Red | 0 | 18 | | | | Leah Guidarelli | 2025-10-28 00:00:00
560093 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-11-01 00:00:00 | 12:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | STEW LEONARDS (YONKERS) | 1 STEW LEONARD DRIVE,STORE 2 | YONKERS | NEW YORK | 10710 | (914) 375-4713 | | Long Island | Westchester | Camilla Ivy | 1 | 317 | 0 | 0 | 0 | 0 | 0 | 0 | 317 | Conundrum Red, Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Bonanza Chardonnay Lot 1 California, Sea Sun Pinot Noir | 45 | 45 | 2449 | 1488058 | 1051208 | Leah Guidarelli | 2025-08-20 00:00:00
562250 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-11-01 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | CAPPY'S WAREHOUSE W & S I | 670 MERRICK RD | LYNBROOK | NEW YORK | 11580 | (516) 256-0444 | | Long Island | Nassau | Kelly O'Malley | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet Sauvignon Lot 8 California, Sea Sun Chardonnay, Conundrum Red, Caymus Vineyards Cabernet Sauvignon Napa Valley | 19 | 25 | 16991 | 2042220 | 1174230 | Allison Ackerman | 2025-09-09 00:00:00
562300 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-11-01 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | BOTTLE WINE & LIQUOR INC | 1911 WANTAGH AVE | WANTAGH | NEW YORK | | (516) 785-0087 | | Long Island | Nassau | Sharon Rosado | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Sea Sun Pinot Noir, Mer Soleil Chardonnay Reserve Monterey, Bonanza Cabernet Sauvignon Lot 8 California, Caymus Vineyards Cabernet Sauvignon California | 5 | 21 | 62360 | | 1352655 | Allison Ackerman | 2025-09-09 00:00:00
567832 | | WAGNER METRO 2025 \*GRAND TASTING\* \***REBATE\*** | Off Premises | 2025-11-01 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | THE WINE GUY | 220 WEST MAIN ST | SMITHTOWN | NEW YORK | 11787 | (631) 780-6200 | | Long Island | Suffolk | Karen Liu | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus Vineyards Cabernet Sauvignon Napa Valley, Caymus-Suisan Walking Fool Red, Conundrum White, Caymus-Suisan Grand Durif | 18 | 80 | 29995 | | 1238884 | Allison Ackerman | 2025-10-20 00:00:00
569508 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-11-01 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | REGO PARK W & L | 97 24 63RD RD | REGO PARK | NEW YORK | 11374 | (718) 275-9300 | | Metro | Queens | Evelyn Delacruz-Gonzalez | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus-Suisan Walking Fool Red, Conundrum Red, Sea Sun Pinot Noir | 3 | 60 | 38021 | | 1256153 | Leah Guidarelli | 2025-10-24 00:00:00
569861 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-11-07 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | FERRARO'S LIQ. STORE/KANTA | 66 W MAIN ST | BABYLON | NEW YORK | 11702 | (631) 669-0039 | | Long Island | Suffolk | Rachel Tufano | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus Vineyards Cabernet Sauvignon California, Bonanza Chardonnay Lot 1 California, Emmolo Sauvignon Blanc, Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley | 8 | 28 | 49245 | 764587 | 1045936 | Leah Guidarelli | 2025-10-27 00:00:00
569509 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-11-07 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | 5 STAR WINE & LIQUORS | 59 12 WOODSIDE AVE | WOODSIDE | NEW YORK | 11377 | (718) 779-1800 | | Metro | Queens | Sheila Jean-Baptiste | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus-Suisan Walking Fool Red, Conundrum Red, Caymus Vineyards Cabernet Sauvignon California | 1 | 13 | 42458 | 1485505 | 1272682 | Leah Guidarelli | 2025-10-24 00:00:00
569510 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-11-07 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | WINE MARKET OF NEW HYDE P | 2337 NEW HYDE PARK RD | NEW HYDE PARK | NEW YORK | 11040 | (516) 328-8800 | | Long Island | Nassau | Diana Cervi Suppa | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Emmolo Sauvignon Blanc, Caymus Vineyards Cabernet Sauvignon California | 9 | 17 | 16477 | 2016841 | 1171509 | Leah Guidarelli | 2025-10-24 00:00:00
569511 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-11-07 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | PAVILLION WINE | 361 S OYSTER BAY RD | PLAINVIEW | NEW YORK | 11803 | (516) 433-0303 | | Long Island | Nassau | Elizabeth Kiel | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Conundrum White, Conundrum Red | 6 | 30 | 23602 | 3719640 | 1225147 | Leah Guidarelli | 2025-10-24 00:00:00
569512 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-11-07 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | MANGROVE W&L/VALLEY STREAM | 263 W. MERRICK RD | VALLEY STREAM | NEW YORK | 11580 | (516) 568-9463 | | Long Island | Nassau | Rita Messina | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Emmolo Sauvignon Blanc, Conundrum Red | 8 | 32 | 1296 | 1410697 | 1015927 | Leah Guidarelli | 2025-10-24 00:00:00
570435 | | WAGNER METRO 2025**\*REBATE**\* | Off Premises | 2025-11-07 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | HAPPY LIQUORS | 40-40 COLLEGE POINT BLVD | FLUSHING | NEW YORK | 11354 | (718) 808-5337 | | Metro | Queens | Yelitza Galan | 1 | 238 | 0 | 0 | 0 | 0 | 3.47 | 0 | 241.47 | Conundrum Red, Emmolo Sauvignon Blanc, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7 | 4 | 20 | | | | Leah Guidarelli | 2025-10-30 00:00:00
570436 | | WAGNER METRO 2025 \*\* **_REBATE_** | Off Premises | 2025-11-07 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | QUEENS WINES & LIQUORS | 5903 71ST AVE | RIDGEWOOD | NEW YORK | 11385 | (718) 821-1500 | | Metro | Queens | Traci Howard | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum Red, Emmolo Merlot, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7 | 5 | 35 | 55535 | 1410152 | 1317966 | Leah Guidarelli | 2025-10-30 00:00:00
570437 | | WAGNER METRO 2025 ** \***REBATE**\* | Off Premises | 2025-11-07 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | L&S WINE & LIQUORS INC/LALA WINE AND LIQUOR (UPTOWN) | 566 WEST 125TH ST | NEW YORK | NEW YORK | 10027 | (646) 590-3287 | | Metro | New York | Giovanna Grandez | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus Vineyards Cabernet Sauvignon Napa Valley, Caymus Vineyards Cabernet Sauvignon California, Conundrum White | 2 | 35 | 58913 | | 1338393 | Leah Guidarelli | 2025-10-30 00:00:00
570825 | | WAGNER METRO 2025 ** **_REBATE_** | Off Premises | 2025-11-07 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | VERNON WINE & LIQUOR | 50 06 VERNON BLVD | LONG ISLAND CITY | NEW YORK | 11101 | (718) 784-5096 | | Metro | Queens | Isabella Vanik | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus-Suisan Walking Fool Red, Caymus Vineyards Cabernet Sauvignon California, Bonanza Cabernet Sauvignon Lot 8 California | 5 | 45 | 46883 | 1428068 | 1287410 | Leah Guidarelli | 2025-11-03 00:00:00
565514 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-11-08 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | HOMEPORT LIQUORS | 80 CANAL ST | STATEN ISLAND | NEW YORK | 10304 | (718) 447-2170 | | Metro | Staten Island | Emily Orengo | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum Red, Mer Soleil Santa Lucia Highlands Reserve Chardonnay, Conundrum White | 8 | 22 | 51846 | 1410586 | 1305965 | Leah Guidarelli | 2025-10-01 00:00:00
569282 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-11-08 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | TERRACE LIQUORS (876 E CONNETQUOT AVENUE) | 876 E CONNETQUOT AVENUE | ISLIP TERRACE | NEW YORK | 11752 | (631) 650-9400 | | Long Island | Suffolk | Sarah (Seyeda) Singh | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus-Suisan Walking Fool Red, Caymus-Suisan Grand Durif, Bonanza Cabernet Sauvignon Lot 8 California, Sea Sun Pinot Noir | 28 | 48 | 40968 | | 1265546 | Leah Guidarelli | 2025-10-23 00:00:00
566075 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-11-08 00:00:00 | 15:00:00 | 18:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | MIDWAY WINE & LIQUOR | 1001 CENTRAL PARK AVE | SCARSDALE | NEW YORK | 10583 | (914) 874-5444 | | Long Island | Westchester | Giselle Cruz | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus Vineyards Cabernet Sauvignon Napa Valley, Conundrum Red, Bonanza Chardonnay Lot 1 California | 4 | 18 | 38755 | | 1258778 | Leah Guidarelli | 2025-10-06 00:00:00
564340 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-11-08 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | BROADWAY LIQUORS & WINES WAREHOUSE | 5790 BROADWAY | BRONX | NEW YORK | 10463 | (347) 843-8329 | | Metro | Bronx | Camilla Ivy | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Emmolo Sauvignon Blanc, Emmolo Merlot, Bonanza Cabernet Sauvignon Lot 8 California, Red Schooner Voyage 12 | 9 | 21 | 50730 | | 1296935 | Leah Guidarelli | 2025-09-24 00:00:00
565581 | | WAGNER METRO 2025 **\*VIP LOBBY SAMPLING 2 SAMPLES OF EACH BRING\*\*** | On Premises | 2025-11-09 00:00:00 | 10:30:00 | 13:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | MANGIA E BEVI | 4857 MERRICK RD | MASSAPEQUA PARK | NEW YORK | 11762 | | | Long Island | Nassau | Katherine Sebor | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Caymus Vineyards Cabernet Sauvignon Napa Valley, Bonanza Chardonnay Lot 1 California, Bonanza Cabernet Sauvignon Lot 8 California | 0 | 50 | | | 6050164 | Leah Guidarelli | 2025-10-02 00:00:00
563613 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-11-09 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | STEW LEONARD'S / VINEYARDS OF FARMINGDALE | 210 AIRPORT PLAZA | FARMINGDALE | NEW YORK | 11735 | (631) 249-3611 | | Long Island | Suffolk | Selena Piliere | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet Sauvignon Lot 8 California, Mer Soleil Silver Chardonnay, Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Conundrum Red | 11 | 20 | 1777 | 1732052 | 1127678 | Leah Guidarelli | 2025-09-17 00:00:00
560069 | | WAGNER METRO 2025 **\*VIP WINE EVENT\*\*** | Off Premises | 2025-11-09 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | STEW LEONARDS (YONKERS) | 1 STEW LEONARD DRIVE,STORE 2 | YONKERS | NEW YORK | 10710 | (914) 375-4713 | | Long Island | Westchester | Camilla Ivy | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Sea Sun Pinot Noir, Sea Sun Chardonnay, Bonanza Chardonnay Lot 1 California, Caymus Vineyards Cabernet Sauvignon California | 16 | 28 | 2449 | 1488058 | 1051208 | Leah Guidarelli | 2025-08-20 00:00:00
568289 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-11-11 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | CROSSROADS W & L | 808 C HICKSVILLE RD. | MASSAPEQUA | NEW YORK | 11758 | (516) 797-7760 | | Long Island | Nassau | Meri Wapnick | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Chardonnay Lot 1 California, Bonanza Cabernet Sauvignon Lot 8 California, Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley | 10 | 22 | 238 | 1409463 | 1015993 | Leah Guidarelli | 2025-10-21 00:00:00
563090 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-11-13 00:00:00 | 12:00:00 | 15:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | THE WINE GUY | 220 WEST MAIN ST | SMITHTOWN | NEW YORK | 11787 | (631) 780-6200 | | Long Island | Suffolk | Daniela DiGiacomo | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Bonanza Chardonnay Lot 1 California, Bonanza Cabernet Sauvignon Lot 8 California | 19 | 22 | 29995 | | 1238884 | Leah Guidarelli | 2025-09-13 00:00:00
562283 | | NO BILL WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-11-13 00:00:00 | 17:30:00 | 20:30:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | RYANN'S WINES | 1897 FRONT ST | EAST MEADOW | NEW YORK | 11554 | (516) 962-8250 | | Long Island | Nassau | Ann Battistelli | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet Sauvignon Lot 8 California, Caymus Vineyards Cabernet Sauvignon California, Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Bonanza Chardonnay Lot 1 California, Emmolo Sauvignon Blanc, Caymus Vineyards Cabernet Sauvignon Napa Valley | 72 | 25 | 51989 | 1409910 | 1307045 | Allison Ackerman | 2025-09-09 00:00:00
571648 | | WAGNER UNY OFF 2025 **\*MUST DISPLAY REBATE IN FRAME ON TABLE\*\*** | Off Premises | 2025-11-14 00:00:00 | 12:00:00 | 15:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | WINE SELLAR (WATERTOWN) | 21305 SAMS DRIVE | WATERTOWN | NEW YORK | | (315) 779-8949 | | Syracuse | | Tessa Connell | 1 | 278 | 0 | 0 | 0 | 0 | 0 | 0 | 278 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Bonanza Chardonnay Lot 1 California, Caymus-Suisan Walking Fool Red, Caymus Vineyards Cabernet Sauvignon Napa Valley | 26 | 30 | 11878 | 1410811 | 2502366 | Kimberly Danielewicz | 2025-11-09 00:00:00
562251 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-11-14 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | CAPPY'S WAREHOUSE W & S I | 670 MERRICK RD | LYNBROOK | NEW YORK | 11580 | (516) 256-0444 | | Long Island | Nassau | Janice Segure | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Mer Soleil Chardonnay Reserve, Caymus Vineyards Cabernet Sauvignon California, Sea Sun Pinot Noir, Bonanza Cabernet Sauvignon Lot 8 California | 17 | 50 | 16991 | 2042220 | 1174230 | Allison Ackerman | 2025-09-09 00:00:00
570186 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-11-14 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | FULI WINE & LIQUOR/TG WINE & LIQUOR | 14 JERICHO TPKE | JERICHO | NEW YORK | 11753 | (516) 493-9200 | | Long Island | Nassau | Dianna Amini | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Sea Sun Pinot Noir, Caymus Vineyards Cabernet Sauvignon California | 3 | 8 | 47957 | 3350201 | 1291908 | Leah Guidarelli | 2025-10-29 00:00:00
563091 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-11-15 00:00:00 | 12:00:00 | 15:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | THE WINE GUY | 220 WEST MAIN ST | SMITHTOWN | NEW YORK | 11787 | (631) 780-6200 | | Long Island | Suffolk | Kristina Catalanotto | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Caymus-Suisan Grand Durif, Caymus Vineyards Cabernet Sauvignon California, Conundrum Red | 18 | 45 | 29995 | | 1238884 | Leah Guidarelli | 2025-09-13 00:00:00
570428 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-11-15 00:00:00 | 12:30:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | PJ'S (UPTOWN) | 4898 BROADWAY | NEW YORK | NEW YORK | 10034 | (212) 567-5500 | | Metro | New York | Madeline Dilone | 1 | 238 | 0 | 0 | 0 | 0 | 4.66 | 0 | 242.66 | Bonanza Cabernet Sauvignon Lot 8 California, Bonanza Chardonnay Lot 1 California, Mer Soleil Santa Lucia Highlands Reserve Chardonnay, Conundrum Red | 6 | 75 | 398 | 1410318 | 1023806 | Leah Guidarelli | 2025-10-30 00:00:00
569843 | | WAGNER UNY OFF 2025 **\*MUST DISPLAY REBATE IN FRAME ON TABLE\*\*** | Off Premises | 2025-11-15 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | WINE WORLD | 3158 NIAGARA FALLS BLVD | AMHERST | NEW YORK | 14228 | | | Buffalo | | Selene Kranz | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum Red, Bonanza Cabernet Sauvignon Lot 8 California, Mer Soleil Silver Chardonnay, Emmolo Sauvignon Blanc, Caymus Vineyards Cabernet Sauvignon California | 41 | 83 | 11616 | 1410817 | 3004140 | Leah Guidarelli | 2025-10-27 00:00:00
567801 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-11-15 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | PRICE RITE | 689 OLD COUNTRY RD | DIX HILLS | NEW YORK | 11746 | (631) 549-8899 | | Long Island | Suffolk | Helena Diringerova | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Sea Sun Chardonnay, Conundrum Red, Bonanza Cabernet Sauvignon Lot 8 California, Conundrum White | 13 | 17 | 1382 | 1410403 | 1146347 | Allison Ackerman | 2025-10-20 00:00:00
567654 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-11-18 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | LIQUOR CITY USA | 965 F RICHMOND AVE | STATEN ISLAND | NEW YORK | 10314 | (718) 761-7799 | | Metro | Staten Island | Adam Elsayed | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum Red, Bonanza Cabernet Sauvignon Lot 8 California, Caymus Vineyards Cabernet Sauvignon California | 4 | 15 | 1360 | 1427859 | 1134964 | Leah Guidarelli | 2025-10-18 00:00:00
568283 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-11-21 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | EHP LIQUOR/COSTCO RIVERHEAD | 1774 OLD COUNTRY RD | RIVERHEAD | NEW YORK | 11901 | (631) 208-8800 | | Long Island | Suffolk | Camille DiMartino | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus Vineyards Cabernet Sauvignon California, Caymus-Suisan Walking Fool Red, Bonanza Cabernet Sauvignon Lot 8 California | 25 | 41 | 43764 | | 1272115 | Leah Guidarelli | 2025-10-21 00:00:00
567841 | | WAGNER UNY OFF 2025 **\*MUST DISPLAY REBATE IN FRAME ON TABLE\*\*** | Off Premises | 2025-11-21 00:00:00 | 15:00:00 | 18:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | SOUTHGATE LIQUORS | 1034 UNION RD | BUFFALO | NEW YORK | | | | Buffalo | | Lynda Gill | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet Sauvignon Lot 8 California, Bonanza Chardonnay Lot 1 California, Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Caymus Vineyards Cabernet Sauvignon Napa Valley | 24 | 35 | 42874 | 1410564 | 3154257 | Kimberly Danielewicz | 2025-10-20 00:00:00
562262 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-11-21 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | GRAM WINE & LIQUORS | 1207 MIDDLE COUNTRY RD | MIDDLE ISLAND | NEW YORK | 11953 | (631) 924-0127 | | Long Island | Suffolk | Katelyn Apicella | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Bonanza Chardonnay Lot 1 California, Caymus Vineyards Cabernet Sauvignon Napa Valley, Caymus-Suisan Walking Fool Red | 3 | 22 | 50278 | 1893909 | 1299468 | Allison Ackerman | 2025-09-09 00:00:00
562299 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-11-21 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | AJ7 WINE & LIQUOR CORP | 172B GARDINERS AVE | LEVITTOWN | NEW YORK | 11756 | (516) 470-0278 | | Long Island | Nassau | Gary Ehrlich | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Caymus Vineyards Cabernet Sauvignon Napa Valley, Bonanza Cabernet Sauvignon Lot 8 California, Caymus Vineyards Cabernet Sauvignon California | 9 | 27 | 33842 | 1409313 | 1249897 | Allison Ackerman | 2025-09-09 00:00:00
564344 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-11-21 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | WAVERLY LIQUOR | 172 RTE 25A | EAST SETAUKET | NEW YORK | 11733 | (631) 941-3103 | | Long Island | Suffolk | Elizabeth Lutjen | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus-Suisan Grand Durif, Emmolo Merlot, Bonanza Chardonnay Lot 1 California | 9 | 29 | 2307 | 1410750 | 1046019 | Leah Guidarelli | 2025-09-24 00:00:00
564345 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-11-21 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | LIQUORIUM | 430-04 NORTH COUNTRY RD | SAINT JAMES | NEW YORK | 11780 | (631) 862-7020 | | Long Island | Suffolk | Brian Robinson | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus-Suisan Grand Durif, Emmolo Merlot, Caymus-Suisan Walking Fool Red, Mer Soleil Santa Lucia Highlands Reserve Chardonnay | 5 | 25 | 46104 | 1409746 | 1284694 | Leah Guidarelli | 2025-09-24 00:00:00
564525 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-11-21 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | WINEMASTERS | 499 MONTAUK HIGHWAY | BABYLON | NEW YORK | 11702 | (631) 669-0049 | | Long Island | Suffolk | Jessica Naus | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus-Suisan Walking Fool Red, Caymus-Suisan Grand Durif, Sea Sun Pinot Noir, Mer Soleil Silver Chardonnay | 4 | 11 | 2054 | 1445819 | 1155508 | Leah Guidarelli | 2025-09-25 00:00:00
567436 | | WAGNER UNY OFF 2025 **\*MUST DISPLAY REBATE IN FRAME ON TABLE\*\*** | Off Premises | 2025-11-21 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | CITY LIQUORS (C/O CITY LIQUORS OF UTICA INC) | 1905 GENESEE ST | UTICA | NEW YORK | 12305 | (315) 734-1930 | | Syracuse | | Karin Minicozzi | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus-Suisan Walking Fool Red, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Conundrum Red, Conundrum White, Caymus Vineyards Cabernet Sauvignon California | 8 | 22 | 12085 | 383563 | 2503636 | Kimberly Danielewicz | 2025-10-16 00:00:00
569668 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-11-21 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | K & W LIQUORS INC. | 163 NEW HYDE PARK RD | FRANKLIN SQUARE | NEW YORK | 11010 | (516) 326-7721 | | Long Island | Nassau | Angela DeMauro | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus Vineyards Cabernet Sauvignon California, Caymus Vineyards Cabernet Sauvignon Napa Valley, Conundrum Red, Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley | 9 | 13 | 1714 | 1466309 | 1015778 | Leah Guidarelli | 2025-10-25 00:00:00
569862 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-11-21 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | FERRARO'S LIQ. STORE/KANTA | 66 W MAIN ST | BABYLON | NEW YORK | 11702 | (631) 669-0039 | | Long Island | Suffolk | Rachel Tufano | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus Vineyards Cabernet Sauvignon Napa Valley, Emmolo Merlot, Caymus-Suisan Grand Durif, Conundrum Red | 1 | 10 | 49245 | 764587 | 1045936 | Leah Guidarelli | 2025-10-27 00:00:00
572372 | | WAGNER UNY OFF 2025 **\*MUST DISPLAY REBATE IN FRAME ON TABLE\*\***- (LARGE STORE TASTING) | Off Premises | 2025-11-21 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | PITTSFORD CENTURY WINES & (WEGMANS) | 3349 MONROE AVE #55 | ROCHESTER | NEW YORK | 14618 | (585) 248-0931 | | Rochester | | Kathy Schoepfel- Church | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet Sauvignon Lot 8 California, Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Emmolo Merlot, Caymus Vineyards Cabernet Sauvignon California, Caymus-Suisan Walking Fool Red | 7 | 35 | 3458 | 2199578 | 3135403 | Kimberly Danielewicz | 2025-11-13 00:00:00
571206 | | WAGNER METRO 2025 ** \***REBATE*** | Off Premises | 2025-11-21 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | NINTH AVENUE VINTNERS | 669 NINTH AVE | NEW YORK | NEW YORK | 10036 | (212) 664-9463 | | Metro | New York | Trivia Feliciano | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum White, Bonanza Cabernet Sauvignon Lot 8 California, Caymus Vineyards Cabernet Sauvignon Napa Valley | 4 | 30 | 314 | 1488010 | 1023814 | Leah Guidarelli | 2025-11-06 00:00:00
572506 | | WAGNER METRO 2025 ***REBATE*** | Off Premises | 2025-11-21 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | ANGELA LIQUOR STORE (FEMALE AMBASSADORS ONLY) | 2532 BROADWAY | ASTORIA | NEW YORK | 11106 | (718) 728-4509 | | Metro | Queens | Traci Howard | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus-Suisan Walking Fool Red, Conundrum Red, Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley | 19 | 56 | 17906 | 1445979 | 1180448 | Allison Ackerman | 2025-11-14 00:00:00
571649 | | WAGNER UNY OFF 2025 ***MUST DISPLAY REBATE IN FRAME ON TABLE\***\* | Off Premises | 2025-11-22 00:00:00 | 12:00:00 | 15:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | PLAZA WINE & LIQUOR (ALEXANDRIA BAY, 41557) | 43449 Route 12 | ALEXANDRIA BAY | NEW YORK | 13607 | (315) 482-2424 | | Syracuse | | Amelia "Kate" Balcom | 1 | 278 | 0 | 0 | 0 | 0 | 0 | 0 | 278 | Bonanza Chardonnay Lot 1 California, Mer Soleil Chardonnay Reserve, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7 | 4 | 5 | 41577 | | 2191088 | Kimberly Danielewicz | 2025-11-09 00:00:00
572278 | | WAGNER METRO 2025 ** **_REBATE_** | Off Premises | 2025-11-22 00:00:00 | 12:00:00 | 15:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | SI DISCOUNT / FOREST-BARD LIQUORS INC | 467 FOREST AVE | STATEN ISLAND | NEW YORK | 10301 | (718) 448-8700 | | Metro | Staten Island | Tanya Nelson | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Sea Sun Pinot Noir, Bonanza Cabernet Sauvignon Lot 8 California, Mer Soleil Silver Chardonnay, Caymus-Suisan Walking Fool Red | 13 | 20 | 40841 | | 1268801 | Leah Guidarelli | 2025-11-13 00:00:00
572353 | | WAGNER UNY OFF 2025 **\*MUST DISPLAY REBATE IN FRAME ON TABLE\*\***- (LARGE STORE TASTING) | Off Premises | 2025-11-22 00:00:00 | 12:00:00 | 15:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | UNION LIQUOR | 2675 UNION ROAD | CHEEKTOWAGA | NEW YORK | 14225 | | | Buffalo | | Selene Kranz | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet Sauvignon Lot 8 California, Bonanza Chardonnay Lot 1 California, Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Conundrum Red | 18 | 65 | 59403 | | 31-66638 | Kimberly Danielewicz | 2025-11-13 00:00:00
562253 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-11-22 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | CAPPY'S WAREHOUSE W & S I | 670 MERRICK RD | LYNBROOK | NEW YORK | 11580 | (516) 256-0444 | | Long Island | Nassau | Robin Linderman | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Chardonnay Lot 1 California, Caymus Vineyards Cabernet Sauvignon Napa Valley, Conundrum Red, Caymus Vineyards Cabernet Sauvignon California, Emmolo Merlot | 17 | 42 | 16991 | 2042220 | 1174230 | Allison Ackerman | 2025-09-09 00:00:00
564346 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-11-22 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | NEW SMITHTOWN LIQUORS STORE INC | 67 RTE 111 | SMITHTOWN | NEW YORK | 11787 | (631) 265-1121 | | Long Island | Suffolk | Brian Robinson | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum White, Conundrum Red, Red Schooner Transit 2 | 8 | 13 | 50840 | 1410544 | 1301005 | Leah Guidarelli | 2025-09-24 00:00:00
572121 | | WAGNER METRO 2025 ** \***REBATE*** | Off Premises | 2025-11-22 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | SILIATO'S LIQUORS/LIQUOR WAREHOUSE OF MILLER PLACE | 327 ROUTE 25A | MILLER PLACE | NEW YORK | 11764 | (631) 928-5013 | | Long Island | Suffolk | Jennifer LaLima | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus Vineyards Cabernet Sauvignon Napa Valley, Bonanza Cabernet Sauvignon Lot 8 California, Caymus Vineyards Cabernet Sauvignon California | 5 | 15 | 1540 | 1410531 | 1046072 | Leah Guidarelli | 2025-11-12 00:00:00
565044 | | WAGNER METRO 2025 ***REBATE*** | Off Premises | 2025-11-22 00:00:00 | 13:30:00 | 16:30:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | STANT | 790 GRAND BLVD | DEER PARK | NEW YORK | 11729 | (631) 242-0318 | | Long Island | Suffolk | Hahn Pugliese | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus Vineyards Cabernet Sauvignon California, Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Mer Soleil Santa Lucia Highlands Reserve Chardonnay, Caymus-Suisan Grand Durif | 16 | 29 | 28214 | | 1243300 | Leah Guidarelli | 2025-09-30 00:00:00
572401 | | WAGNER UNY OFF 2025 ***MUST DISPLAY REBATE IN FRAME ON TABLE\****- (LARGE STORE TASTING) | Off Premises | 2025-11-22 00:00:00 | 14:00:00 | 17:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | 5 POINTS WINE & LIQUOR | 1 WASHINGTON BLVD | OSWEGO | NEW YORK | 13126 | (315) 216-6142 | | Syracuse | | Heidi Bailey-Pryor | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet Sauvignon Lot 8 California, Conundrum Red, Bonanza Chardonnay Lot 1 California | 7 | 22 | 51746 | | 2209378 | Kimberly Danielewicz | 2025-11-13 00:00:00
572404 | | WAGNER UNY OFF 2025 ***MUST DISPLAY REBATE IN FRAME ON TABLE\****- (LARGE STORE TASTING) | Off Premises | 2025-11-22 00:00:00 | 14:00:00 | 17:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | PERINTON LIQUOR | 12 COURTNEY DR UNIT G | FAIRPORT | NEW YORK | | | | Rochester | | Caitlyn Peterson | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet Sauvignon Lot 8 California, Conundrum Red, Caymus Vineyards Cabernet Sauvignon California, Caymus-Suisan Walking Fool Red | 2 | 20 | 4090 | 2589914 | 3132178 | Kimberly Danielewicz | 2025-11-13 00:00:00
572802 | | WAGNER METRO 2025 ***REBATE*** | Off Premises | 2025-11-22 00:00:00 | 15:00:00 | 18:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | BAYPORT WINE & LIQUOR DEP | 726 MONTAUK HWY | BAYPORT | NEW YORK | 11705 | (631) 472-6701 | | Long Island | Suffolk | Jody Colon | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Bonanza Cabernet Sauvignon Lot 8 California, Caymus-Suisan Walking Fool Red | 2 | 14 | 17892 | 1728843 | 1180070 | Leah Guidarelli | 2025-11-17 00:00:00
558047 | | WAGNER METRO 2025 ***REBATE*** | Off Premises | 2025-11-22 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | MICHAEL TOWNE WINE & SPIRITS / CLARK ST | 100 HENRY ST AKA 73 CLARK ST | BROOKLYN | NEW YORK | 11201 | (718) 875-3667 | | Metro | Brooklyn | Alan Bemben | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum Red, Mer Soleil Santa Lucia Highlands Reserve Chardonnay, Caymus-Suisan Walking Fool Red | 6 | 24 | 451 | 767834 | 1107582 | Leah Guidarelli | 2025-07-31 00:00:00
562664 | | WAGNER METRO 2025 ***REBATE*** | Off Premises | 2025-11-22 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | WINEMASTERS | 499 MONTAUK HIGHWAY | BABYLON | NEW YORK | 11702 | (631) 669-0049 | | Long Island | Suffolk | Melissa Kraut | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus Vineyards Cabernet Sauvignon California, Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Emmolo Merlot, Bonanza Chardonnay Lot 1 California | 7 | 23 | 2054 | 1445819 | 1155508 | Leah Guidarelli | 2025-09-10 00:00:00
563614 | | WAGNER METRO 2025 ***REBATE*** | Off Premises | 2025-11-22 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | STEW LEONARD'S / VINEYARDS OF FARMINGDALE | 210 AIRPORT PLAZA | FARMINGDALE | NEW YORK | 11735 | (631) 249-3611 | | Long Island | Suffolk | Heather Reis | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus Vineyards Cabernet Sauvignon Napa Valley, Emmolo Merlot, Caymus-Suisan Walking Fool Red, Caymus Vineyards Cabernet Sauvignon California | 4 | 50 | 1777 | 1732052 | 1127678 | Leah Guidarelli | 2025-09-17 00:00:00
565291 | | WAGNER METRO 2025 ***REBATE*** | Off Premises | 2025-11-22 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | EXCELLENT WINE & LIQ | 1746 VETERANS MEMORIAL HIGHWAY | ISLANDIA | NEW YORK | | (631) 234-9300 | | Long Island | Suffolk | Ella Smith | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus Vineyards Cabernet Sauvignon California, Caymus-Suisan Grand Durif, Conundrum White, Bonanza Chardonnay Lot 1 California | 4 | 7 | 1970 | 1485061 | | Leah Guidarelli | 2025-09-30 00:00:00
568287 | | WAGNER METRO 2025 ***REBATE*** | Off Premises | 2025-11-22 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | DCER / BROADWAY WAREHOUSE LIQ | 349 WANTAGH AVE. | LEVITTOWN | NEW YORK | 11756 | (516) 579-7463 | | Long Island | Nassau | Christine Piacente | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus Vineyards Cabernet Sauvignon Napa Valley 50th Anniversary, Bonanza Chardonnay Lot 1 California, Bonanza Cabernet Sauvignon Lot 8 California, Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley | 2 | 10 | 52628 | 1409263 | 1308160 | Leah Guidarelli | 2025-10-21 00:00:00
572373 | | WAGNER UNY OFF 2025 ***MUST DISPLAY REBATE IN FRAME ON TABLE\****- (LARGE STORE TASTING) | Off Premises | 2025-11-22 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | PITTSFORD CENTURY WINES & (WEGMANS) | 3349 MONROE AVE #55 | ROCHESTER | NEW YORK | 14618 | (585) 248-0931 | | Rochester | | Caitlyn Peterson | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet Sauvignon Lot 8 California, Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Conundrum Red, Conundrum White, Sea Sun Chardonnay | 16 | 50 | 3458 | 2199578 | 3135403 | Kimberly Danielewicz | 2025-11-13 00:00:00
570706 | | WAGNER UNY OFF 2025 ***MUST DISPLAY REBATE IN FRAME ON TABLE\**** | Off Premises | 2025-11-23 00:00:00 | 11:45:00 | 15:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | CHILI LIQUOR STORE | 3218 CHILI AVE | ROCHESTER | NEW YORK | | (585) 889-2660 | | Rochester | | Helen Fee | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum Red, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Caymus Vineyards Cabernet Sauvignon California, Mer Soleil Chardonnay Reserve | 17 | 100 | 11687 | 1409362 | 3009755 | Kimberly Danielewicz | 2025-11-03 00:00:00
567359 | | WAGNER UNY OFF 2025 ***MUST DISPLAY REBATE IN FRAME ON TABLE\**** | Off Premises | 2025-11-23 00:00:00 | 12:00:00 | 15:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | LIQUOR DEPOT (ONEONTA) | 739 HIGHWAY RT 28 | ONEONTA | NEW YORK | 13820 | (607) 431-2589 | | Syracuse | | Giana Fabozzi | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum Red, Caymus Vineyards Cabernet Sauvignon Napa Valley, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 3, Bonanza Chardonnay Lot 1 California | 7 | 10 | 11987 | 1581599 | 2506695 | Kimberly Danielewicz | 2025-10-15 00:00:00
568285 | | WAGNER METRO 2025 ***REBATE*** | Off Premises | 2025-11-23 00:00:00 | 12:00:00 | 15:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | EHP LIQUOR/COSTCO RIVERHEAD | 1774 OLD COUNTRY RD | RIVERHEAD | NEW YORK | 11901 | (631) 208-8800 | | Long Island | Suffolk | Jennifer LaLima | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus Vineyards Cabernet Sauvignon Napa Valley, Caymus-Suisan Walking Fool Red, Bonanza Cabernet Sauvignon Lot 8 California, Conundrum Red | 15 | 25 | 43764 | | 1272115 | Leah Guidarelli | 2025-10-21 00:00:00
568290 | | WAGNER METRO 2025 ***REBATE*** | Off Premises | 2025-11-23 00:00:00 | 12:00:00 | 15:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | CROSSROADS W & L | 808 C HICKSVILLE RD. | MASSAPEQUA | NEW YORK | 11758 | (516) 797-7760 | | Long Island | Nassau | Meri Wapnick | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Chardonnay Lot 1 California, Caymus-Suisan Walking Fool Red, Caymus Vineyards Cabernet Sauvignon California | 16 | 24 | 238 | 1409463 | 1015993 | Leah Guidarelli | 2025-10-21 00:00:00
569917 | | WAGNER UNY OFF 2025 ***MUST DISPLAY REBATE IN FRAME ON TABLE\**** | Off Premises | 2025-11-25 00:00:00 | 15:00:00 | 18:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | SOUTHTOWNS WINE & LIQUOR | 4095 N BUFFALO ST | ORCHARD PARK | NEW YORK | | (716) 662-5650 | | Buffalo | | Mary Ann Jolls | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet Sauvignon Lot 8 California, Mer Soleil Silver Chardonnay, Caymus Vineyards Cabernet Sauvignon California, Bonanza Chardonnay Lot 1 California, Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley | 13 | 15 | 60238 | 1410566 | 3169597 | Kimberly Danielewicz | 2025-10-28 00:00:00
560094 | | WAGNER METRO 2025 ***REBATE*** | Off Premises | 2025-11-26 00:00:00 | 12:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | STEW LEONARDS (YONKERS) | 1 STEW LEONARD DRIVE,STORE 2 | YONKERS | NEW YORK | 10710 | (914) 375-4713 | | Long Island | Westchester | Camilla Ivy | 1 | 317 | 0 | 0 | 0 | 0 | 0 | 0 | 317 | Caymus Vineyards Cabernet Sauvignon California, Bonanza Chardonnay Lot 1 California, Bonanza Cabernet Sauvignon Lot 8 California, Sea Sun Chardonnay, Emmolo Merlot | 33 | 49 | 2449 | 1488058 | 1051208 | Leah Guidarelli | 2025-08-20 00:00:00
562284 | | WAGNER METRO 2025 ***REBATE*** | Off Premises | 2025-11-26 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | RYANN'S WINES | 1897 FRONT ST | EAST MEADOW | NEW YORK | 11554 | (516) 962-8250 | | Long Island | Nassau | Ann Battistelli | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus-Suisan Walking Fool Red, Caymus Vineyards Cabernet Sauvignon California, Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Emmolo Sauvignon Blanc, Caymus Vineyards Cabernet Sauvignon Napa Valley, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 3 | 19 | 26 | 51989 | 1409910 | 1307045 | Allison Ackerman | 2025-09-09 00:00:00
543079 | | WAGNER UNY OFF 2025 ***MUST DISPLAY REBATE IN FRAME ON TABLE\**** | Off Premises | 2025-11-26 00:00:00 | 15:00:00 | 18:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | CHM LIQUORS (COSTCO) | 345 WESTFALL RD | ROCHESTER | NEW YORK | 14620 | (585) 292-0007 | | Rochester | | Anne Lambert | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Caymus-Suisan Walking Fool Red, Conundrum White, Conundrum Red, Caymus California Paso Robles Cabernet Sauvignon | 14 | 30 | 52983 | | 3160519 | Jadyn Siuta | 2025-04-07 00:00:00
571647 | | WAGNER UNY OFF 2025 ***MUST DISPLAY REBATE IN FRAME ON TABLE\**** | Off Premises | 2025-11-26 00:00:00 | 15:00:00 | 18:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | ARSENAL WINE & LIQUOR DEP | 940 ARSENAL STREET | WATERTOWN | NEW YORK | | (315) 777-8707 | | Syracuse | | Maria Pierce | 1 | 278 | 0 | 0 | 0 | 0 | 0 | 0 | 278 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Bonanza Chardonnay Lot 1 California | 11 | 20 | 5587 | 3562229 | 2606907 | Kimberly Danielewicz | 2025-11-09 00:00:00
573198 | | WAGNER METRO 2025 ***REBATE**\* \***GRAND OPENING NEW STORE\**** | Off Premises | 2025-11-26 00:00:00 | 15:00:00 | 18:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | ATLANTIC BAYVIEW WINES | 492 ATLANTIC AVE | FREEPORT | NEW YORK | 11520 | (516) 417-3697 | | Long Island | Nassau | Staci Rosen | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus Vineyards Cabernet Sauvignon Napa Valley, Bonanza Cabernet Sauvignon Lot 8 California, Caymus-Suisan Walking Fool Red | 5 | 9 | 51068 | | | Leah Guidarelli | 2025-11-20 00:00:00
569667 | | WAGNER METRO 2025 ***REBATE**\* | Off Premises | 2025-11-26 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | LAKE LIQUOR, INC. | 299-2 HAWKINS AVE | RONKONKOMA | NEW YORK | 11779 | (631) 585-6100 | | Long Island | Suffolk | Louise Grinsell | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus Vineyards Cabernet Sauvignon California, Caymus-Suisan Walking Fool Red, Conundrum Red, Bonanza Cabernet Sauvignon Lot 8 California | 37 | 30 | 1513 | 1427676 | 1046113 | Leah Guidarelli | 2025-10-25 00:00:00
571027 | | WAGNER METRO 2025 ** **_REBATE_** | Off Premises | 2025-11-26 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | PAVILLION WINE | 361 S OYSTER BAY RD | PLAINVIEW | NEW YORK | 11803 | (516) 433-0303 | | Long Island | Nassau | Linda Lowell | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus Vineyards Cabernet Sauvignon Napa Valley 50th Anniversary, Caymus Vineyards Cabernet Sauvignon California, Bonanza Chardonnay Lot 1 California, Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley | 15 | 36 | 23602 | 3719640 | 1225147 | Leah Guidarelli | 2025-11-05 00:00:00
571029 | | WAGNER METRO 2025 ** \***REBATE*** | Off Premises | 2025-11-26 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | WINE MARKET OF NEW HYDE P | 2337 NEW HYDE PARK RD | NEW HYDE PARK | NEW YORK | 11040 | (516) 328-8800 | | Long Island | Nassau | Angela DeMauro | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Chardonnay Lot 1 California, Conundrum Red, Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Caymus Vineyards Cabernet Sauvignon Napa Valley 50th Anniversary | 5 | 14 | 16477 | 2016841 | 1171509 | Leah Guidarelli | 2025-11-05 00:00:00
567802 | | WAGNER METRO 2025 ***REBATE**\* | Off Premises | 2025-11-26 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | PRICE RITE | 689 OLD COUNTRY RD | DIX HILLS | NEW YORK | 11746 | (631) 549-8899 | | Long Island | Suffolk | Helena Diringerova | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus Vineyards Cabernet Sauvignon California, Conundrum Red, Bonanza Cabernet Sauvignon Lot 8 California, Conundrum White | 22 | 30 | 1382 | 1410403 | 1146347 | Allison Ackerman | 2025-10-20 00:00:00
571028 | | WAGNER METRO 2025 ** **_REBATE_** | Off Premises | 2025-11-26 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | MANGROVE W&L/VALLEY STREAM | 263 W. MERRICK RD | VALLEY STREAM | NEW YORK | 11580 | (516) 568-9463 | | Long Island | Nassau | Sandra Verene | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Emmolo Sauvignon Blanc, Conundrum Red, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Caymus-Suisan Walking Fool Red | 16 | 16 | 1296 | 1410697 | 1015927 | Leah Guidarelli | 2025-11-05 00:00:00
571030 | | WAGNER METRO 2025 ** \***REBATE**\* | Off Premises | 2025-11-26 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | QUEENS WINES & LIQUORS | 5903 71ST AVE | RIDGEWOOD | NEW YORK | 11385 | (718) 821-1500 | | Metro | Queens | Tito Ruiz | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Emmolo Merlot, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Caymus Vineyards Cabernet Sauvignon Napa Valley 50th Anniversary | 12 | 37 | 55535 | 1410152 | 1317966 | Leah Guidarelli | 2025-11-05 00:00:00
571031 | | WAGNER METRO 2025 ** **_REBATE_** | Off Premises | 2025-11-26 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | MUHO LIQUOR | 28 11 STEINWAY ST | ASTORIA | NEW YORK | 11103 | (718) 777-2122 | | Metro | Queens | Jasmine Spiess | 1 | 238 | 0 | 0 | 0 | 0 | 2.72 | 0 | 240.72 | Emmolo Sauvignon Blanc, Conundrum Red, Caymus Vineyards Cabernet Sauvignon California, Bonanza Cabernet Sauvignon Lot 8 California | 9 | 19 | 20692 | 2634581 | 1204251 | Leah Guidarelli | 2025-11-05 00:00:00
571032 | | WAGNER METRO 2025 ** \***REBATE**\* | Off Premises | 2025-11-26 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | KING'S WINE & SPIRITS | 111 GRAHAM AVE | BROOKLYN | NEW YORK | 11206 | (646) 920-1616 | | Metro | Brooklyn | Jonathan Rose | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus-Suisan Walking Fool Red, Conundrum Red, Conundrum White, Bonanza Cabernet Sauvignon Lot 8 California | 7 | 38 | 51605 | | 1304157 | Leah Guidarelli | 2025-11-05 00:00:00
571033 | | WAGNER METRO 2025 ** **_REBATE_** | Off Premises | 2025-11-26 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | 5 STAR WINE & LIQUORS | 59 12 WOODSIDE AVE | WOODSIDE | NEW YORK | 11377 | (718) 779-1800 | | Metro | Queens | Traci Howard | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus-Suisan Walking Fool Red, Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Caymus Vineyards Cabernet Sauvignon Napa Valley 50th Anniversary, Emmolo Sauvignon Blanc | 17 | 36 | 42458 | 1485505 | 1272682 | Leah Guidarelli | 2025-11-05 00:00:00
572505 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-11-26 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | DAS LIQUORS | 3835 CRESCENT STREET | LONG ISLAND CITY | NEW YORK | 11101 | | | Metro | Queens | Allyson Ansel | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Mer Soleil Santa Lucia Highlands Reserve Chardonnay, Caymus Vineyards Cabernet Sauvignon Napa Valley, Sea Sun Pinot Noir | 3 | 12 | | | | Allison Ackerman | 2025-11-14 00:00:00
564341 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-11-28 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | BROADWAY LIQUORS & WINES WAREHOUSE | 5790 BROADWAY | BRONX | NEW YORK | 10463 | (347) 843-8329 | | Metro | Bronx | Camilla Ivy | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Emmolo Sauvignon Blanc, Caymus Vineyards Cabernet Sauvignon Napa Valley, Caymus Vineyards Cabernet Sauvignon California | 4 | 13 | 50730 | | 1296935 | Leah Guidarelli | 2025-09-24 00:00:00
573556 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-11-29 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | NIZGA CORP. AVENUE A LIQUOR | 58 AVENUE A | NEW YORK | NEW YORK | 10009 | (212) 420-1449 | | Metro | New York | Joseph Carestia | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Chardonnay Lot 1 California, Conundrum White, Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Conundrum Red | 5 | 28 | 65620 | 1410182 | 1023551 | Leah Guidarelli | 2025-11-22 00:00:00
562538 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-12-04 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | MORTON WILLIAMS W&S (PARK AVE) | 270 PARK AVE SOUTH | NEW YORK | NEW YORK | 10010 | (212) 477-5490 | | Metro | New York | Crystallia Karl | 1 | 238 | 0 | 0 | 0 | 0 | 4.34 | 0 | 242.34 | Caymus Vineyards Cabernet Sauvignon California, Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Caymus-Suisan Walking Fool Red, Mer Soleil Santa Lucia Highlands Reserve Chardonnay | 7 | 17 | 47831 | | 1282464 | Leah Guidarelli | 2025-09-10 00:00:00
568288 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-12-05 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | DCER / BROADWAY WAREHOUSE LIQ | 349 WANTAGH AVE. | LEVITTOWN | NEW YORK | 11756 | (516) 579-7463 | | Long Island | Nassau | Elizabeth Kiel | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Emmolo Merlot, Mer Soleil Silver Chardonnay, Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Caymus Vineyards Cabernet Sauvignon Napa Valley 50th Anniversary | 8 | 25 | 52628 | 1409263 | 1308160 | Leah Guidarelli | 2025-10-21 00:00:00
562255 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-12-06 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | CAPPY'S WAREHOUSE W & S I | 670 MERRICK RD | LYNBROOK | NEW YORK | 11580 | (516) 256-0444 | | Long Island | Nassau | Sharon Rosado | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet, Lot 2, Bonanza Chardonnay Lot 1 California, Caymus Vineyards Cabernet Sauvignon Napa Valley, Sea Sun Pinot Noir, Emmolo Merlot | 32 | 47 | 16991 | 2042220 | 1174230 | Allison Ackerman | 2025-09-09 00:00:00
563615 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-12-06 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | STEW LEONARD'S / VINEYARDS OF FARMINGDALE | 210 AIRPORT PLAZA | FARMINGDALE | NEW YORK | 11735 | (631) 249-3611 | | Long Island | Suffolk | Diana Kozic | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum White, Emmolo Sauvignon Blanc, Conundrum Red, Sea Sun Pinot Noir | 19 | 45 | 1777 | 1732052 | 1127678 | Leah Guidarelli | 2025-09-17 00:00:00
563664 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-12-06 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | BOTTLE WINE & LIQUOR INC | 1911 WANTAGH AVE | WANTAGH | NEW YORK | | (516) 785-0087 | | Long Island | Nassau | Kimberly Carlstrom | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Bonanza Chardonnay Lot 1 California, Emmolo Sauvignon Blanc, Emmolo Merlot | 4 | 22 | 62360 | | 1352655 | Leah Guidarelli | 2025-09-17 00:00:00
571599 | | WAGNER METRO 2025 ** \***REBATE*** | Off Premises | 2025-12-06 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | GARDEN CITY DISCOUNT (BJ'S) | 711 STEWART AVE | GARDEN CITY | NEW YORK | 11530 | (516) 228-9463 | | Long Island | Nassau | Lidia Rodriguez | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum White, Bonanza Cabernet Sauvignon Lot 8 California, Caymus Vineyards Cabernet Sauvignon California, Bonanza Chardonnay Lot 1 California, Mer Soleil Silver Chardonnay, Caymus-Suisan Walking Fool Red | 20 | 25 | 40963 | | 1268275 | Leah Guidarelli | 2025-11-08 00:00:00
564342 | | WAGNER METRO 2025 ***REBATE*** | Off Premises | 2025-12-06 00:00:00 | 14:00:00 | 17:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | BROADWAY LIQUORS & WINES WAREHOUSE | 5790 BROADWAY | BRONX | NEW YORK | 10463 | (347) 843-8329 | | Metro | Bronx | Dorothy kaufman | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet Sauvignon Lot 8 California, Caymus-Suisan Walking Fool Red, Mer Soleil Silver Chardonnay, Sea Sun Pinot Noir | 12 | 38 | 50730 | | 1296935 | Leah Guidarelli | 2025-09-24 00:00:00
571852 | | WAGNER UNY OFF 2025 ***MUST DISPLAY REBATE IN FRAME ON TABLE\**** | Off Premises | 2025-12-06 00:00:00 | 14:00:00 | 17:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | BIG VALUE WINE & LIQUORS | 374 WINDSOR HWY | VAILS GATE | NEW YORK | | (845) 562-9445 | | Hudson Valley/Rockland | | Joyce Buonfiglio | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Conundrum Red, Conundrum White | 19 | 30 | 55300 | 1409224 | 2138935 | Kimberly Danielewicz | 2025-11-10 00:00:00
573560 | | WAGNER METRO 2025 ***REBATE*** | Off Premises | 2025-12-06 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | RYANN'S WINES | 1897 FRONT ST | EAST MEADOW | NEW YORK | 11554 | (516) 962-8250 | | Long Island | Nassau | Lidia Rodriguez | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Chardonnay Lot 1 California, Caymus Vineyards Cabernet Sauvignon Napa Valley, Caymus Vineyards Cabernet Sauvignon California, Caymus-Suisan Walking Fool Red, Caymus-Suisan Grand Durif, Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Emmolo Sauvignon Blanc, Red Schooner Transit 2, Red Schooner Voyage 12 | 14 | 45 | 51989 | 1409910 | 1307045 | Leah Guidarelli | 2025-11-22 00:00:00
560070 | | WAGNER METRO 2025 ***VIP WINE EVENT\**** | Off Premises | 2025-12-07 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | STEW LEONARDS (YONKERS) | 1 STEW LEONARD DRIVE,STORE 2 | YONKERS | NEW YORK | 10710 | (914) 375-4713 | | Long Island | Westchester | Camilla Ivy | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Bonanza Chardonnay Lot 1 California, Caymus-Suisan Walking Fool Red, Caymus Vineyards Cabernet Sauvignon California, Caymus Vineyards Cabernet Sauvignon Napa Valley, Emmolo Sauvignon Blanc, Caymus Special Selection Cabernet | 29 | 58 | 2449 | 1488058 | 1051208 | Leah Guidarelli | 2025-08-20 00:00:00
573200 | | WAGNER METRO 2025 ***REBATE*** (VIP TASTING) | Off Premises | 2025-12-07 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | STEW LEONARD'S / VINEYARDS OF FARMINGDALE | 210 AIRPORT PLAZA | FARMINGDALE | NEW YORK | 11735 | (631) 249-3611 | | Long Island | Suffolk | Hahn Pugliese | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus Vineyards Cabernet Sauvignon California, Caymus Vineyards Cabernet Sauvignon Napa Valley, Caymus-Suisan Walking Fool Red, Emmolo Sauvignon Blanc, Emmolo Merlot | 51 | 86 | 1777 | 1732052 | 1127678 | Leah Guidarelli | 2025-11-20 00:00:00
566851 | | WAGNER UNY OFF 2025 ***MUST DISPLAY REBATE IN FRAME ON TABLE\**** | Off Premises | 2025-12-09 00:00:00 | 15:00:00 | 18:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | EMPIRE WINE & LIQUOR (1440 CENTRAL AVE) | 1440 CENTRAL AVE | ALBANY | NEW YORK | 12205 | (518) 694-8503 | | North Albany | | Leola Edelin | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Mer Soleil Chardonnay Reserve, Mer Soleil Chardonnay Silver Unoaked California, Emmolo Merlot, Emmolo Sauvignon Blanc | 2 | 25 | 12207 | 2261924 | 2137544 | Kimberly Danielewicz | 2025-10-12 00:00:00
574097 | | WAGNER UNY OFF 2025 ***MUST DISPLAY REBATE IN FRAME ON TABLE\**** | Off Premises | 2025-12-12 00:00:00 | 12:00:00 | 15:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | MARKETVIEW | 1100 JEFFERSON RD | ROCHESTER | NEW YORK | 14623 | (585) 427-2480 | | Rochester | | Bernadette Rizzo | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet Sauvignon Lot 8 California, Mer Soleil Chardonnay Reserve, Caymus Vineyards Cabernet Sauvignon California, Caymus-Suisan Walking Fool Red | 7 | 15 | 12034 | 765940 | 3009753 | Kimberly Danielewicz | 2025-11-29 00:00:00
574371 | | WAGNER METRO 2025 ***REBATE*** | Off Premises | 2025-12-12 00:00:00 | 12:00:00 | 15:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | SWIFTWAY WINE & LIQUOR | 1604 ROUTE 112 | MEDFORD | NEW YORK | 11763 | (631) 654-8000 | | Long Island | Suffolk | Cindy DeMasi | 1 | 238 | 0 | 0 | 0 | 0 | 2.49 | 0 | 240.49 | Caymus-Suisan Walking Fool Red, Sea Sun Chardonnay, Sea Sun Pinot Noir, Caymus Vineyards Cabernet Sauvignon California | 4 | 26 | 1819 | 1410618 | 1150730 | Leah Guidarelli | 2025-12-03 00:00:00
562256 | | WAGNER METRO 2025 ***REBATE*** | Off Premises | 2025-12-12 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | CAPPY'S WAREHOUSE W & S I | 670 MERRICK RD | LYNBROOK | NEW YORK | 11580 | (516) 256-0444 | | Long Island | Nassau | Sharon Rosado | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet, Lot 2, Bonanza Chardonnay Lot 1 California, Caymus Vineyards Cabernet Sauvignon Napa Valley, Emmolo Merlot | 26 | 41 | 16991 | 2042220 | 1174230 | Allison Ackerman | 2025-09-09 00:00:00
567840 | | WAGNER UNY OFF 2025 ***MUST DISPLAY REBATE IN FRAME ON TABLE\**** | Off Premises | 2025-12-12 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | BREMERS WINE & LIQUOR | 4684 COMMERCIAL DR | NEW HARTFORD | NEW YORK | 13413 | (315) 768-6400 | | Syracuse | | Jessica Kingsley | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Conundrum White, Caymus Vineyards Cabernet Sauvignon California, Mer Soleil Chardonnay Reserve Monterey | 7 | 135 | 27191 | 1785413 | 2503609 | Kimberly Danielewicz | 2025-10-20 00:00:00
572695 | | WAGNER METRO 2025 ***REBATE*** | Off Premises | 2025-12-12 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | LIQUORIUM | 430-04 NORTH COUNTRY RD | SAINT JAMES | NEW YORK | 11780 | (631) 862-7020 | | Long Island | Suffolk | Brian Robinson | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus-Suisan Grand Durif, Bonanza Chardonnay Lot 1 California, Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley | 1 | 15 | 46104 | 1409746 | 1284694 | Leah Guidarelli | 2025-11-14 00:00:00
573199 | | WAGNER METRO 2025 ***REBATE**\* | Off Premises | 2025-12-12 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | BAYSHORE DISCOUNT LIQUOR INC | 567 E MAIN ST | BAYSHORE | NEW YORK | 11706 | | | Long Island | Suffolk | Kathleen Davis | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus Vineyards Cabernet Sauvignon California, Caymus Vineyards Cabernet Sauvignon Napa Valley, Caymus-Suisan Walking Fool Red | 2 | 25 | 65850 | | 6054695 | Leah Guidarelli | 2025-11-20 00:00:00
572460 | | WAGNER METRO 2025 ** **_REBATE_** | Off Premises | 2025-12-12 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | MR. VINO WINE & SPIRITS/A M P | 107-02 71ST AVE | FOREST HILLS | NEW YORK | 11375 | (718) 261-3012 | | Metro | Queens | Evelyn Delacruz-Gonzalez | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus Vineyards Cabernet Sauvignon California, Caymus-Suisan Walking Fool Red, Bonanza Chardonnay Lot 1 California, Conundrum Red | 0 | 50 | 36676 | | 1246582 | Leah Guidarelli | 2025-11-13 00:00:00
573526 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-12-12 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | BRITEBUY | 90 FRANKLIN ST | NEW YORK | NEW YORK | 10013 | (212) 226-4993 | | Metro | New York | Grace O'Connor | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus Vineyards Cabernet Sauvignon California, Bonanza Cabernet Sauvignon Lot 8 California, Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley | 2 | 41 | 1116 | 1409256 | 1260171 | Leah Guidarelli | 2025-11-22 00:00:00
573557 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-12-12 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | NIZGA CORP. AVENUE A LIQUOR | 58 AVENUE A | NEW YORK | NEW YORK | 10009 | (212) 420-1449 | | Metro | New York | Madeline Thompson | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Chardonnay Lot 1 California, Conundrum White, Bonanza Cabernet Sauvignon Lot 8 California, Conundrum Red | 8 | 35 | 65620 | 1410182 | 1023551 | Leah Guidarelli | 2025-11-22 00:00:00
566626 | | WAGNER UNY OFF 2025 **\*MUST DISPLAY REBATE IN FRAME ON TABLE\*\*** | Off Premises | 2025-12-13 00:00:00 | 12:00:00 | 15:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | COLONIAL WINE & SPIRITS (ORCHARD PARK/BUFFALO) | 3211 SOUTHWESTERN BLVD | ORCHARD PARK | NEW YORK | 14127 | (716) 674-3736 | | Buffalo | | Lynda Gill | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus-Suisan Walking Fool Red, Bonanza Cabernet Sauvignon Lot 8 California, Bonanza Chardonnay Lot 1 California, Conundrum Red, Caymus Vineyards Cabernet Sauvignon California | 32 | 40 | 12232 | 1741907 | 3115754 | Kimberly Danielewicz | 2025-10-10 00:00:00
563665 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-12-13 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | BOTTLE WINE & LIQUOR INC | 1911 WANTAGH AVE | WANTAGH | NEW YORK | | (516) 785-0087 | | Long Island | Nassau | Kimberly Carlstrom | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Sea Sun Pinot Noir, Sea Sun Chardonnay, Caymus-Suisan Walking Fool Red, Caymus Vineyards Cabernet Sauvignon California | 6 | 25 | 62360 | | 1352655 | Leah Guidarelli | 2025-09-17 00:00:00
566767 | | WAGNER UNY OFF 2025 **\*MUST DISPLAY REBATE IN FRAME ON TABLE\*\*** | Off Premises | 2025-12-13 00:00:00 | 15:00:00 | 18:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | EMPIRE WINE & LIQUOR (1440 CENTRAL AVE) | 1440 CENTRAL AVE | ALBANY | NEW YORK | 12205 | (518) 694-8503 | | North Albany | | Eric Patton | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus Vineyards Cabernet Sauvignon Napa Valley 50th Anniversary, Sea Sun Pinot Noir, Red Schooner Voyage 12, Bonanza Cabernet Sauvignon Lot 8 California, Conundrum Red | 26 | 50 | 12207 | 2261924 | 2137544 | Kimberly Danielewicz | 2025-10-10 00:00:00
574106 | | WAGNER UNY OFF 2025 **\*MUST DISPLAY REBATE IN FRAME ON TABLE\*\*** | Off Premises | 2025-12-13 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | SUPERMARKET LIQUOR & WINE | 8438 NIAGARA FALLS BLVD | NIAGARA FALLS | NEW YORK | 14304 | (716) 297-7393 | | Buffalo | | Lynn Simonian | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet Sauvignon Lot 8 California, Bonanza Chardonnay Lot 1 California, Conundrum Red, Mer Soleil Santa Lucia Highlands Reserve Chardonnay, Caymus Vineyards Cabernet Sauvignon California | 12 | 17 | 11677 | 1427995 | 3011362 | Kimberly Danielewicz | 2025-11-29 00:00:00
571114 | | WAGNER UNY OFF 2025 **\*MUST DISPLAY REBATE IN FRAME ON TABLE\*\*** | Off Premises | 2025-12-14 00:00:00 | 12:00:00 | 15:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | RYANS WINE & SPIRITS | 73 EASTERN BLVD | CANANDAIGUA | NEW YORK | | (585) 394-4740 | | Rochester | | JoAnn Shaughnessy | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus Vineyards Cabernet Sauvignon California, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Conundrum White, Conundrum Red, Mer Soleil Silver Chardonnay | 15 | 25 | 2542 | 1410537 | 3140572 | Kimberly Danielewicz | 2025-11-05 00:00:00
567655 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-12-19 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | LIQUOR CITY USA | 965 F RICHMOND AVE | STATEN ISLAND | NEW YORK | 10314 | (718) 761-7799 | | Metro | Staten Island | Joseph Giannoccoli | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum Red, Bonanza Cabernet Sauvignon Lot 8 California, Caymus Vineyards Cabernet Sauvignon California | 5 | 14 | 1360 | 1427859 | 1134964 | Leah Guidarelli | 2025-10-18 00:00:00
569669 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-12-19 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | K & W LIQUORS INC. | 163 NEW HYDE PARK RD | FRANKLIN SQUARE | NEW YORK | 11010 | (516) 326-7721 | | Long Island | Nassau | Janice Segure | 1 | 238 | 0 | 0 | 0 | 0 | 19.53 | 0 | 257.53 | Caymus Vineyards Cabernet Sauvignon California, Caymus Vineyards Cabernet Sauvignon Napa Valley, Conundrum Red, Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley | 14 | 45 | 1714 | 1466309 | 1015778 | Leah Guidarelli | 2025-10-25 00:00:00
570912 | | WAGNER UNY OFF 2025 **\*MUST DISPLAY REBATE IN FRAME ON TABLE\*\*** | Off Premises | 2025-12-19 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | PARKWAY LIQUOR | 3333 CONSAUL ROAD | SCHENECTADY | NEW YORK | | (518) 374-6666 | | North Albany | | Jessie Maroncelli | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 88.39 | 326.39 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Bonanza Chardonnay Lot 1 California, Caymus Vineyards Cabernet Sauvignon California | 5 | 12 | 26816 | 1879226 | 2011998 | Kimberly Danielewicz | 2025-11-04 00:00:00
572696 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-12-19 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | LIQUORIUM | 430-04 NORTH COUNTRY RD | SAINT JAMES | NEW YORK | 11780 | (631) 862-7020 | | Long Island | Suffolk | Brian Robinson | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum White, Conundrum Red, Mer Soleil Silver Chardonnay, Caymus Vineyards Cabernet Sauvignon California | 3 | 7 | 46104 | 1409746 | 1284694 | Leah Guidarelli | 2025-11-14 00:00:00
573032 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-12-19 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | MORTON WILLIAMS W&S/23 EAST WINES | 311 E 23RD ST | NEW YORK | NEW YORK | 10010 | (212) 213-0021 | | Metro | New York | Russell Marisak | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Mer Soleil Santa Lucia Highlands Reserve Chardonnay, Caymus-Suisan Walking Fool Red | 10 | 22 | 37925 | | 1255830 | Leah Guidarelli | 2025-11-18 00:00:00
574898 | | WAGNER UNY OFF 2025 **\*MUST DISPLAY REBATE IN FRAME ON TABLE\*\*** | Off Premises | 2025-12-19 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | PUTNAM WINE & LIQUORS (545 ROUTE 6, MAHOPAC 59542) | 545 ROUTE 6 (MAIN ST) | MAHOPAC | NEW YORK | | (845) 628-8808 | | Hudson Valley/Rockland | | Jeniffer Stewart | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum Red, Conundrum White | 3 | 15 | 59542 | 1427866 | 2157823 | Kimberly Danielewicz | 2025-12-08 00:00:00
575012 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-12-19 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | REGO PARK W & L | 97 24 63RD RD | REGO PARK | NEW YORK | 11374 | (718) 275-9300 | | Metro | Queens | Laura David | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus Vineyards Cabernet Sauvignon Napa Valley 50th Anniversary, Caymus-Suisan Walking Fool Red, Sea Sun Pinot Noir | 3 | 22 | 38021 | | 1256153 | Allison Ackerman | 2025-12-09 00:00:00
575129 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-12-19 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | RIVERSIDE LIQUORS INC. (UPTOWN DELIVERY) | 2728 BROADWAY | NEW YORK | NEW YORK | 10025 | (212) 749-0665 | | Metro | New York | Daniel Gregg | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus-Suisan Walking Fool Red, Conundrum Red, Mer Soleil Santa Lucia Highlands Reserve Chardonnay, Red Schooner Transit 3 | 3 | 20 | 1468 | 1410406 | 1268436 | Leah Guidarelli | 2025-12-09 00:00:00
575502 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-12-19 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | PRIMETIME LIQUORS CORP | 427 5TH AVE | BROOKLYN | NEW YORK | 11215 | (718) 788-8181 | | Metro | Brooklyn | Diana Rohee | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus-Suisan Grand Durif, Caymus Vineyards Cabernet Sauvignon Napa Valley 50th Anniversary, Bonanza Cabernet Sauvignon Lot 8 California | 9 | 50 | 24029 | | 1230892 | Leah Guidarelli | 2025-12-14 00:00:00
563666 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-12-20 00:00:00 | 12:00:00 | 15:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | BOTTLE WINE & LIQUOR INC | 1911 WANTAGH AVE | WANTAGH | NEW YORK | | (516) 785-0087 | | Long Island | Nassau | Kimberly Carlstrom | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Red Schooner, NV, Caymus Suisun Redgale Grenache, Caymus Vineyards Cabernet Sauvignon California | 13 | 32 | 62360 | | 1352655 | Leah Guidarelli | 2025-09-17 00:00:00
570013 | | WAGNER METRO 2025 **_REBATE_** (BRING PRINT OUT OF COMPARISON) | Off Premises | 2025-12-20 00:00:00 | 12:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | STEW LEONARDS (YONKERS) | 1 STEW LEONARD DRIVE,STORE 2 | YONKERS | NEW YORK | 10710 | (914) 375-4713 | | Long Island | Westchester | Camilla Ivy | 1 | 317 | 0 | 0 | 0 | 0 | 0 | 0 | 317 | Caymus Vineyards Cabernet Sauvignon Napa Valley, Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley | 31 | 57 | 2449 | 1488058 | 1051208 | Leah Guidarelli | 2025-10-28 00:00:00
574558 | | WAGNER UNY OFF 2025 **\*MUST DISPLAY REBATE IN FRAME ON TABLE\*\*** | Off Premises | 2025-12-20 00:00:00 | 12:00:00 | 15:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | LIQUOR BOX (3670 MT READ BLVD) | 3670 MT READ BLVD | ROCHESTER | NEW YORK | | (585) 448-1998 | | Rochester | | Susan Todd | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet Sauvignon Lot 8 California, Bonanza Chardonnay Lot 1 California, Conundrum Red, Conundrum White | 14 | 36 | 52313 | 1998896 | 3009714 | Kimberly Danielewicz | 2025-12-04 00:00:00
543080 | | WAGNER UNY OFF 2025 **\*MUST DISPLAY REBATE IN FRAME ON TABLE\*\*** | Off Premises | 2025-12-20 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | CHM LIQUORS (COSTCO) | 345 WESTFALL RD | ROCHESTER | NEW YORK | 14620 | (585) 292-0007 | | Rochester | | Karen Young | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7, Caymus-Suisan Walking Fool Red, Conundrum White, Conundrum Red, Caymus California Paso Robles Cabernet Sauvignon | 12 | 20 | 52983 | | 3160519 | Jadyn Siuta | 2025-04-07 00:00:00
562258 | | WAGNER METRO 2025 **_REBATE_** | Off Premises | 2025-12-20 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | CAPPY'S WAREHOUSE W & S I | 670 MERRICK RD | LYNBROOK | NEW YORK | 11580 | (516) 256-0444 | | Long Island | Nassau | Janice Segure | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet, Lot 2, Bonanza Chardonnay Lot 1 California, Caymus Vineyards Cabernet Sauvignon Napa Valley, Emmolo Merlot, Sea Sun Pinot Noir | 42 | 65 | 16991 | 2042220 | 1174230 | Allison Ackerman | 2025-09-09 00:00:00
572408 | | WAGNER METRO 2025 ** \***REBATE*** | Off Premises | 2025-12-20 00:00:00 | 14:00:00 | 17:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | PRICE RITE | 689 OLD COUNTRY RD | DIX HILLS | NEW YORK | 11746 | (631) 549-8899 | | Long Island | Suffolk | Helena Diringerova | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus Vineyards Cabernet Sauvignon California, Bonanza Cabernet Sauvignon Lot 8 California, Conundrum White, Conundrum Red | 20 | 26 | 1382 | 1410403 | 1146347 | Allison Ackerman | 2025-11-13 00:00:00
572760 | | WAGNER UNY OFF 2025 ***MUST DISPLAY REBATE IN FRAME ON TABLE\**** | Off Premises | 2025-12-20 00:00:00 | 14:00:00 | 17:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | BEST BUY LIQUOR & WINE | 70 NORTH MAIN STREET | NEW CITY | NEW YORK | | (845) 639-0121 | | Hudson Valley/Rockland | | Marina Greenburg | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet Sauvignon Lot 8 California, Bonanza Chardonnay Lot 1 California, Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Sea Sun Pinot Noir, Caymus-Suisan Walking Fool Red | 6 | 28 | 11759 | 1427327 | | Kimberly Danielewicz | 2025-11-16 00:00:00
568320 | | WAGNER UNY OFF 2025 ***MUST DISPLAY REBATE IN FRAME ON TABLE\**** | Off Premises | 2025-12-20 00:00:00 | 15:30:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | LIQUOR WORLD OF SYRACUSE | 314 E 1ST ST | EAST SYRACUSE | NEW YORK | 13057 | (315) 400-3500 | | Syracuse | | Ebony Pengel | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet Sauvignon Lot 8 California, Caymus Vineyards Cabernet Sauvignon California, Caymus-Suisan Walking Fool Red, Conundrum Red | 7 | 18 | 52022 | | 2210457 | Leah Guidarelli | 2025-10-21 00:00:00
558048 | | WAGNER METRO 2025 ***REBATE*** | Off Premises | 2025-12-20 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | MICHAEL TOWNE WINE & SPIRITS / CLARK ST | 100 HENRY ST AKA 73 CLARK ST | BROOKLYN | NEW YORK | 11201 | (718) 875-3667 | | Metro | Brooklyn | Alan Bemben | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum White, Mer Soleil Santa Lucia Highlands Reserve Chardonnay, Bonanza Cabernet Sauvignon Lot 8 California, Caymus Vineyards Cabernet Sauvignon California | 8 | 20 | 451 | 767834 | 1107582 | Leah Guidarelli | 2025-07-31 00:00:00
563616 | | WAGNER METRO 2025 ***REBATE*** | Off Premises | 2025-12-20 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | STEW LEONARD'S / VINEYARDS OF FARMINGDALE | 210 AIRPORT PLAZA | FARMINGDALE | NEW YORK | 11735 | (631) 249-3611 | | Long Island | Suffolk | Delia Keane | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus Vineyards Cabernet Sauvignon Napa Valley, Emmolo Merlot, Caymus-Suisan Walking Fool Red, Red Schooner, NV | 7 | 30 | 1777 | 1732052 | 1127678 | Leah Guidarelli | 2025-09-17 00:00:00
570363 | | WAGNER UNY OFF 2025 ***MUST DISPLAY REBATE IN FRAME ON TABLE\**** | Off Premises | 2025-12-20 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | SHAMROCK LIQUORS (3565 RT 9, HIGHLAND) | 3565 ROUTE 9W | HIGHLAND | NEW YORK | 12528 | (845) 691-9195 | | Hudson Valley/Rockland | | Malene Vazquez | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus-Suisan Walking Fool Red, Conundrum White, Conundrum Red, Bonanza by Chuck Wagner California Cabernet Sauvignon Lot 7 | 3 | 6 | 33499 | | 2164942 | Kimberly Danielewicz | 2025-10-30 00:00:00
574395 | | WAGNER METRO 2025 ***REBATE*** | Off Premises | 2025-12-20 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | TRIBECA W & L | 173 W BROADWAY | NEW YORK | NEW YORK | 10013 | (212) 965-0657 | | Metro | New York | Annamaria Pace | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Bonanza Cabernet Sauvignon Lot 8 California, Caymus Vineyards Cabernet Sauvignon California | 3 | 20 | | | | Leah Guidarelli | 2025-12-03 00:00:00
574899 | | WAGNER UNY OFF 2025 ***MUST DISPLAY REBATE IN FRAME ON TABLE\**** | Off Premises | 2025-12-20 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | PUTNAM WINE & LIQUORS (545 ROUTE 6, MAHOPAC 59542) | 545 ROUTE 6 (MAIN ST) | MAHOPAC | NEW YORK | | (845) 628-8808 | | Hudson Valley/Rockland | | Kim Palmieri | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Bonanza Cabernet Sauvignon Lot 8 California | 9 | 20 | 59542 | 1427866 | 2157823 | Kimberly Danielewicz | 2025-12-08 00:00:00
575373 | | WAGNER METRO 2025 ***REBATE*** | Off Premises | 2025-12-20 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | TURTLE BAY LIQUORS | 855 2ND AVE | NEW YORK | NEW YORK | 10017 | (212) 867-4417 | | Metro | New York | Anna Gleyzerman | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Mer Soleil Santa Lucia Highlands Reserve Chardonnay, Caymus Vineyards Cabernet Sauvignon Napa Valley, Bonanza Cabernet Sauvignon Lot 8 California | 7 | 60 | 50597 | 1410674 | 1299909 | Leah Guidarelli | 2025-12-12 00:00:00
568291 | | WAGNER METRO 2025 ***REBATE*** | Off Premises | 2025-12-21 00:00:00 | 12:00:00 | 15:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | CROSSROADS W & L | 808 C HICKSVILLE RD. | MASSAPEQUA | NEW YORK | 11758 | (516) 797-7760 | | Long Island | Nassau | Elizabeth Kiel | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Mer Soleil Santa Lucia Highlands Reserve Chardonnay, Caymus Vineyards Cabernet Sauvignon California | 14 | 55 | 238 | 1409463 | 1015993 | Leah Guidarelli | 2025-10-21 00:00:00
574372 | | WAGNER METRO 2025 ***REBATE*** | Off Premises | 2025-12-21 00:00:00 | 12:00:00 | 15:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | SWIFTWAY WINE & LIQUOR | 1604 ROUTE 112 | MEDFORD | NEW YORK | 11763 | (631) 654-8000 | | Long Island | Suffolk | Cindy DeMasi | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Bonanza Chardonnay Lot 1 California, Caymus-Suisan Grand Durif, Caymus Vineyards Cabernet Sauvignon California | 7 | 31 | 1819 | 1410618 | 1150730 | Leah Guidarelli | 2025-12-03 00:00:00
574021 | | WAGNER METRO 2025 ***REBATE*** | Off Premises | 2025-12-21 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | JFK LIQUORS (262 LARKFIELD RD) | 262 LARKFIELD RD | EAST NORTHPORT | NEW YORK | 11731 | (631) 261-1044 | | Long Island | Suffolk | Sarah Frueh | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Chardonnay Lot 1 California, Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Caymus Vineyards Cabernet Sauvignon California, Caymus-Suisan Grand Durif | 2 | 10 | 61304 | | | Leah Guidarelli | 2025-11-26 00:00:00
575316 | | WAGNER UNY OFF 2025 ***MUST DISPLAY REBATE IN FRAME ON TABLE\**** | Off Premises | 2025-12-21 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | PRICE RIGHT WINE & LIQUOR | 1520 ROUTE 55 | LAGRANGEVILLE | NEW YORK | | (845) 592-2344 | | Hudson Valley/Rockland | | Angela DiFatta | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Emmolo Sauvignon Blanc, Conundrum Red, Conundrum White, Caymus Vineyards Cabernet Sauvignon Napa Valley, Bonanza Cabernet Sauvignon Lot 8 California | 20 | 20 | 39026 | 3797010 | 2152191 | Carolyn Cavarretta | 2025-12-11 00:00:00
574098 | | WAGNER UNY OFF 2025 ***MUST DISPLAY REBATE IN FRAME ON TABLE\**** | Off Premises | 2025-12-22 00:00:00 | 15:00:00 | 18:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | PITTSFORD CENTURY WINES & (WEGMANS) | 3349 MONROE AVE #55 | ROCHESTER | NEW YORK | 14618 | (585) 248-0931 | | Rochester | | Bernadette Rizzo | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet Sauvignon Lot 8 California, Bonanza Chardonnay Lot 1 California, Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Caymus-Suisan Walking Fool Red, Caymus Vineyards Cabernet Sauvignon California | 29 | 26 | 3458 | 2199578 | 3135403 | Kimberly Danielewicz | 2025-11-29 00:00:00
575972 | | WAGNER UNY OFF 2025 ***MUST DISPLAY REBATE IN FRAME ON TABLE\**** (SAA) | Off Premises | 2025-12-22 00:00:00 | 15:00:00 | 18:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | GRAND WINE & SPIRITS- PENDLETON (6888 S TRANSIT) | 6888 TRANSIT RD | PENDLETON | NEW YORK | 14094 | | | Buffalo | | KerriAnne Onan | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Bonanza Chardonnay Lot 1 California, Caymus-Suisan Walking Fool Red | 19 | 25 | 60579 | | | Leah Guidarelli | 2025-12-19 00:00:00
568286 | | WAGNER METRO 2025 ***REBATE*** | Off Premises | 2025-12-22 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | EHP LIQUOR/COSTCO RIVERHEAD | 1774 OLD COUNTRY RD | RIVERHEAD | NEW YORK | 11901 | (631) 208-8800 | | Long Island | Suffolk | Ryan Licata | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus Vineyards Cabernet Sauvignon Napa Valley, Caymus-Suisan Walking Fool Red, Bonanza Cabernet Sauvignon Lot 8 California, Conundrum Red | 11 | 20 | 43764 | | 1272115 | Leah Guidarelli | 2025-10-21 00:00:00
575011 | | WAGNER METRO 2025 ***REBATE*** | Off Premises | 2025-12-22 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | BROADWAY SPIRITS | 299 BROADWAY | NEW YORK | NEW YORK | 10007 | (212) 227-8200 | | Metro | New York | Crystallia Karl | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus Vineyards Cabernet Sauvignon California, Caymus Vineyards Cabernet Sauvignon Napa Valley, Mer Soleil Chardonnay Reserve Monterey | 5 | 20 | 42370 | | 1271574 | Allison Ackerman | 2025-12-09 00:00:00
560095 | | WAGNER METRO 2025 ***REBATE*** | Off Premises | 2025-12-23 00:00:00 | 12:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | STEW LEONARDS (YONKERS) | 1 STEW LEONARD DRIVE,STORE 2 | YONKERS | NEW YORK | 10710 | (914) 375-4713 | | Long Island | Westchester | Camilla Ivy | 1 | 317 | 0 | 0 | 0 | 0 | 0 | 0 | 317 | Caymus Vineyards Cabernet Sauvignon Napa Valley, Emmolo Sauvignon Blanc, Caymus-Suisan Grand Durif, Sea Sun Pinot Noir | 54 | 55 | 2449 | 1488058 | 1051208 | Leah Guidarelli | 2025-08-20 00:00:00
574800 | | WAGNER UNY OFF 2025 ***MUST DISPLAY REBATE IN FRAME ON TABLE\**** | Off Premises | 2025-12-23 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | CAMILLUS LIQUORS INC (COSTCO) | 120 TOWNSHIP BLVD SUITE 20 | CAMILLUS | NEW YORK | 13210 | (315) 487-4800 | | Syracuse | | Chad Chase | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet Sauvignon Lot 8 California, Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Conundrum Red, Conundrum White, Caymus Vineyards Cabernet Sauvignon Napa Valley | 5 | 16 | 44762 | | 2197070 | Leah Guidarelli | 2025-12-05 00:00:00
572762 | | WAGNER UNY OFF 2025 ***MUST DISPLAY REBATE IN FRAME ON TABLE\**** | Off Premises | 2025-12-23 00:00:00 | 15:00:00 | 18:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | BASIN WINE & SPIRITS INC | 657 PITTSFORD VICTOR ROAD | PITTSFORD | NEW YORK | 14534 | (585) 381-9800 | | Rochester | | Brooke Zegarelli | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus-Suisan Walking Fool Red, Caymus Vineyards Cabernet Sauvignon California, Conundrum White, Conundrum Red | 10 | 42 | 49231 | 1410027 | 3157871 | Kimberly Danielewicz | 2025-11-16 00:00:00
562285 | | WAGNER METRO 2025 ***REBATE*** | Off Premises | 2025-12-23 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | RYANN'S WINES | 1897 FRONT ST | EAST MEADOW | NEW YORK | 11554 | (516) 962-8250 | | Long Island | Nassau | Dina Sferlazza | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Sea Sun Pinot Noir, Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Bonanza Chardonnay Lot 1 California, Emmolo Sauvignon Blanc, Caymus Vineyards Cabernet Sauvignon Napa Valley, Red Schooner Transit 3 | 33 | 10 | 51989 | 1409910 | 1307045 | Allison Ackerman | 2025-09-09 00:00:00
568284 | | WAGNER METRO 2025 ***REBATE*** | Off Premises | 2025-12-23 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | EHP LIQUOR/COSTCO RIVERHEAD | 1774 OLD COUNTRY RD | RIVERHEAD | NEW YORK | 11901 | (631) 208-8800 | | Long Island | Suffolk | Janice Fritz | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus Vineyards Cabernet Sauvignon California, Caymus-Suisan Walking Fool Red, Bonanza Cabernet Sauvignon Lot 8 California | 17 | 40 | 43764 | | 1272115 | Leah Guidarelli | 2025-10-21 00:00:00
574929 | | WAGNER UNY OFF 2025 ***MUST DISPLAY REBATE IN FRAME ON TABLE\**** | Off Premises | 2025-12-23 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | IRONDEQUOIT PLAZA LIQ MAR | 525 TITUS AVE | ROCHESTER | NEW YORK | | (585) 467-8420 | | Rochester | | Christine Miller | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet Sauvignon Lot 8 California, Bonanza Chardonnay Lot 1 California, Conundrum Red, Mer Soleil Silver Chardonnay | 5 | 20 | 62413 | 1409808 | 3171632 | Kimberly Danielewicz | 2025-12-08 00:00:00
575973 | | WAGNER UNY OFF 2025 ***MUST DISPLAY REBATE IN FRAME ON TABLE\**** (SAA) | Off Premises | 2025-12-23 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | GRAND WINE & SPIRITS- PENDLETON (6888 S TRANSIT) | 6888 TRANSIT RD | PENDLETON | NEW YORK | 14094 | | | Buffalo | | Kathleen Middione | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Bonanza Chardonnay Lot 1 California, Caymus-Suisan Walking Fool Red | 8 | 45 | 60579 | | | Leah Guidarelli | 2025-12-19 00:00:00
575287 | | WAGNER METRO 2025 ***REBATE*** | Off Premises | 2025-12-24 00:00:00 | 12:00:00 | 15:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | TERRACE LIQUORS (876 E CONNETQUOT AVENUE) | 876 E CONNETQUOT AVENUE | ISLIP TERRACE | NEW YORK | 11752 | (631) 650-9400 | | Long Island | Suffolk | Sarah (Seyeda) Singh | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus-Suisan Walking Fool Red, Caymus Vineyards Cabernet Sauvignon Napa Valley, Bonanza Cabernet Sauvignon Lot 8 California, Sea Sun Chardonnay | 86 | 80 | 40968 | | 1265546 | Leah Guidarelli | 2025-12-11 00:00:00
575013 | | WAGNER METRO 2025 ***REBATE*** | Off Premises | 2025-12-24 00:00:00 | 15:00:00 | 18:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | WINE MARKET OF NEW HYDE P | 2337 NEW HYDE PARK RD | NEW HYDE PARK | NEW YORK | 11040 | (516) 328-8800 | | Long Island | Nassau | Heather Poster | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus Vineyards Cabernet Sauvignon Napa Valley 50th Anniversary, Emmolo Sauvignon Blanc, Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley | 16 | 37 | 16477 | 2016841 | 1171509 | Allison Ackerman | 2025-12-09 00:00:00
575014 | | WAGNER METRO 2025 ***REBATE*** | Off Premises | 2025-12-24 00:00:00 | 15:00:00 | 18:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | PAVILLION WINE | 361 S OYSTER BAY RD | PLAINVIEW | NEW YORK | 11803 | (516) 433-0303 | | Long Island | Nassau | Allyson Levine | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus Vineyards Cabernet Sauvignon Napa Valley 50th Anniversary, Emmolo Sauvignon Blanc, Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Conundrum White | 16 | 30 | 23602 | 3719640 | 1225147 | Allison Ackerman | 2025-12-09 00:00:00
575017 | | WAGNER METRO 2025 ***REBATE*** | Off Premises | 2025-12-24 00:00:00 | 15:00:00 | 18:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | MANGROVE W&L/VALLEY STREAM | 263 W. MERRICK RD | VALLEY STREAM | NEW YORK | 11580 | (516) 568-9463 | | Long Island | Nassau | Erica Dingle | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus Vineyards Cabernet Sauvignon Napa Valley 50th Anniversary, Emmolo Sauvignon Blanc, Bonanza Cabernet Sauvignon Lot 8 California | 3 | 40 | 1296 | 1410697 | 1015927 | Allison Ackerman | 2025-12-09 00:00:00
575018 | | WAGNER METRO 2025 ***REBATE*** | Off Premises | 2025-12-24 00:00:00 | 15:00:00 | 18:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | QUEENS WINES & LIQUORS | 5903 71ST AVE | RIDGEWOOD | NEW YORK | 11385 | (718) 821-1500 | | Metro | Queens | Tito Ruiz | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus Vineyards Cabernet Sauvignon Napa Valley 50th Anniversary, Emmolo Merlot, Bonanza Cabernet Sauvignon Lot 8 California | 17 | 80 | 55535 | 1410152 | 1317966 | Allison Ackerman | 2025-12-09 00:00:00
575501 | | WAGNER METRO 2025 ***REBATE*** | Off Premises | 2025-12-24 00:00:00 | 15:00:00 | 18:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | GNG WINE & LIQUOR | 82-33 153RD AVE | HOWARD BEACH | NEW YORK | 11414 | (718) 843-2120 | | Metro | Queens | Marta Palacio | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus-Suisan Walking Fool Red, Caymus Vineyards Cabernet Sauvignon Napa Valley 50th Anniversary, Bonanza Cabernet Sauvignon Lot 8 California | 9 | 45 | 39873 | | 1263356 | Leah Guidarelli | 2025-12-14 00:00:00
576042 | | WAGNER METRO 2025 ***REBATE*** (CANCELED) | Off Premises | 2025-12-24 00:00:00 | 15:00:00 | 18:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | DAS LIQUORS | 3835 CRESCENT STREET | LONG ISLAND CITY | NEW YORK | 11101 | | | Metro | Queens | Regine Sawyer | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Bonanza Chardonnay Lot 1 California, Caymus Vineyards Cabernet Sauvignon Napa Valley | 0 | 0 | | | | Leah Guidarelli | 2025-12-19 00:00:00
575146 | | WAGNER METRO 2025 ***REBATE*** | Off Premises | 2025-12-24 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | FUJIAN LIQUOR PLAZA | 133 WALT WHITMAN RD | HUNTINGTON STATION | NEW YORK | 11746 | (631) 271-0004 | | Long Island | Nassau | Meghan Scolo | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus-Suisan Walking Fool Red, Emmolo Merlot, Emmolo Sauvignon Blanc, Caymus Vineyards Cabernet Sauvignon California | 8 | 35 | 29208 | | 1243640 | Leah Guidarelli | 2025-12-10 00:00:00
575016 | | WAGNER METRO 2025 ***REBATE*** | Off Premises | 2025-12-24 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | L&S WINE & LIQUORS INC/LALA WINE AND LIQUOR (UPTOWN) | 566 WEST 125TH ST | NEW YORK | NEW YORK | 10027 | (646) 590-3287 | | Metro | New York | Anna Gleyzerman | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus Vineyards Cabernet Sauvignon California, Conundrum White, Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley | 3 | 60 | 58913 | | 1338393 | Allison Ackerman | 2025-12-09 00:00:00
576133 | | WAGNER METRO 2025 ***REBATE*** (SAA) | Off Premises | 2025-12-24 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | CITY WINE CELLAR INC | 2295 RICHMOND AVE | STATEN ISLAND | NEW YORK | 10314 | (718) 494-1400 | | Metro | Staten Island | Anna Gleyzerman | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Emmolo Sauvignon Blanc, Bonanza Chardonnay Lot 1 California, Caymus Vineyards Cabernet Sauvignon California | 15 | 65 | 59353 | | 1337148 | Leah Guidarelli | 2025-12-23 00:00:00
574543 | | WAGNER METRO 2025 ***REBATE*** | Off Premises | 2025-12-26 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | DCER / BROADWAY WAREHOUSE LIQ | 349 WANTAGH AVE. | LEVITTOWN | NEW YORK | 11756 | (516) 579-7463 | | Long Island | Nassau | Elizabeth Kiel | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Bonanza Chardonnay Lot 1 California, Caymus-Suisan Walking Fool Red, Emmolo Sauvignon Blanc | 6 | 25 | 52628 | 1409263 | 1308160 | Leah Guidarelli | 2025-12-04 00:00:00
564343 | | WAGNER METRO 2025 ***REBATE*** | Off Premises | 2025-12-26 00:00:00 | 17:00:00 | 20:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | BROADWAY LIQUORS & WINES WAREHOUSE | 5790 BROADWAY | BRONX | NEW YORK | 10463 | (347) 843-8329 | | Metro | Bronx | Camilla Ivy | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Emmolo Sauvignon Blanc, Emmolo Merlot, Bonanza Cabernet Sauvignon Lot 8 California, Caymus Vineyards Cabernet Sauvignon Napa Valley | 16 | 15 | 50730 | | 1296935 | Leah Guidarelli | 2025-09-24 00:00:00
575419 | | WAGNER UNY OFF 2025 ***MUST DISPLAY REBATE IN FRAME ON TABLE\**** | Off Premises | 2025-12-27 00:00:00 | 14:00:00 | 17:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | BOOZY'S WINE & SPIRITS | 3035 BUFFALO RD | ROCHESTER | NEW YORK | 14624 | | | Rochester | | Kim Palumbo | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum Red, Bonanza Chardonnay Lot 1 California, Bonanza Lot 9 Cabernet Sauvignon | 4 | 11 | | | | Kimberly Danielewicz | 2025-12-12 00:00:00
563617 | | WAGNER METRO 2025 ***REBATE*** | Off Premises | 2025-12-28 00:00:00 | 13:00:00 | 16:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | STEW LEONARD'S / VINEYARDS OF FARMINGDALE | 210 AIRPORT PLAZA | FARMINGDALE | NEW YORK | 11735 | (631) 249-3611 | | Long Island | Suffolk | Rachel Tufano | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Bonanza Cabernet Sauvignon Lot 8 California, Bonanza Cabernet Sauvignon The Vinekeeper Napa Valley, Mer Soleil Silver Chardonnay, Conundrum White | 3 | 20 | 1777 | 1732052 | 1127678 | Leah Guidarelli | 2025-09-17 00:00:00
563667 | | WAGNER METRO 2025 ***REBATE**\* | Off Premises | 2025-12-30 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | BOTTLE WINE & LIQUOR INC | 1911 WANTAGH AVE | WANTAGH | NEW YORK | | (516) 785-0087 | | Long Island | Nassau | Kimberly Carlstrom | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Conundrum White, Conundrum Red, Bonanza Cabernet Sauvignon Lot 8 California, Bonanza Chardonnay Lot 1 California | 8 | 25 | 62360 | | 1352655 | Leah Guidarelli | 2025-09-17 00:00:00
572409 | | WAGNER METRO 2025 ** **_REBATE_** | Off Premises | 2025-12-30 00:00:00 | 16:00:00 | 19:00:00 | 0 | Southern Glazer’s Wine & Spirits | | Wagner Family Wines | | | PRICE RITE | 689 OLD COUNTRY RD | DIX HILLS | NEW YORK | 11746 | (631) 549-8899 | | Long Island | Suffolk | Helena Diringerova | 1 | 238 | 0 | 0 | 0 | 0 | 0 | 0 | 238 | Caymus Vineyards Cabernet Sauvignon California, Bonanza Cabernet Sauvignon Lot 8 California, Conundrum White, Conundrum Red | 16 | 28 | 1382 | 1410403 | 1146347 | Allison Ackerman | 2025-11-13 00:00:00
| | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | 121099.98 | | | | | | | |

================================================================================
FILE: Campari Answers.xlsx
PATH: /Users/ethan/Library/CloudStorage/OneDrive-SharedLibraries-HartAgencyNY/Ambar-HART Teams Site - Documents/Ambar-Development/Current HEMs Application - Process- Examples/HEMS Questionnaire - Supplier Event Questions/Campari Answers.xlsx
================================================================================
Sheets: ['Campari On', 'Campari Off']

--- Sheet: Campari On (rows: 16, cols: 8) ---
Questions | Did event reach Drinks Sold goal? If not, why? If event exceeded goal, please explain what worked well | Was this account a good fit for the program/would you recommend running additional promotions here? | Please provide any positive callouts: | Please provide any opportunities or challenges | What was the main question asked by consumers during sampling? | Consumer feedback and quotes: | What was cocktail made/served?
Picklist Answers | So light and refreshing they wanted another. | Customers were eager to sample | Loved the POS materials. | Great venue with a fitting age group. | What does it taste like? | “This is so fun! I love that you’re here!” | \*Include all cocktails for all brands for Campari Brands
| People ordered more shots. | Customers ordered additional rounds | High visibility drove interest. | Need promotional materials. | Where is the product from? | “This is so smooth!” | \*\*Other for Manual fill in
| Attendees who sampled purchased another. | Customers enjoyed the experience. | Enthusiastic and knowledgeable bartenders/servers. | Not busy | Is it new? | “Can I have the recipe?” |
| Lively atmosphere helped boost sales. | Customers showed curiosity about the product and actively engaged with sampling. | Venue was fun and busy. | Busy venue | Is it on sale? | “This is a great cocktail!” |
| Knowledgeable and enthusiastic staff. | The staff were knowledgeable about the product and supported sales efforts. | Patrons were engaging | Customers mentioned sampling was too early in the day. | Does it come in smaller bottles? | “I love the hats, shirts, giveaways.” |
| Effective timing of the promotion. | The demographic matched the brand’s target audience well. | | Small venue and was able to talk with everyone. | How much alcohol is in it? | |
| Having POS materials available helped. | Customers expressed interest in learning more about the brand and its offerings. | | Large venue and could not talk with everyone. | What cocktails can you make? | |
| Slower traffic. | The location had excellent foot traffic, contributing to higher engagement. | | | | |
| Servers or bartenders did not promote the featured drink. | | | | | |
| Slow day due to off-season, weather, or competing events. | | | | | |

--- Sheet: Campari Off (rows: 21, cols: 9) ---
Questions | After sampling did consumer perception change? Explain. | Did event reach Bottles sold goal? If not, why? If event exceeded goal, please explain what worked well | What was the predominant occasion consumers were shopping for? | Was this account a good fit for the program/would you recommend running additional promotions here? | Please provide any positive callouts: | Please provide any opportunities or challenges | What was the main question asked by consumers during sampling? | Consumer feedback and quotes:
Picklist Answers | Yes, perception improved significantly. | The best selling points were how smooth it was for a tequila is what most said others was the taste of the of the product | Birthday Gift | Yes Account as a good fit for the program with the right attendees and right crowd focus. | Sale price encouraged purchases. | Not interested in sampling today | Where’s the product from? | "This is so fun! I love that you’re here!"
| Yes, they loved the price. | Yes, the store had promoted the tasting | Sport event | Yes Account has a good fit with the right cocktail type focus. | Staff actively encouraged sampling. | Slower day for this location | Is it new? | "This is so smooth!"
| Yes, it converted skeptics. | Yes, the location was ideal for this product | Party Friends getting together | Yes staff are big supporters of our brands. | Customers were surprised by how much they liked the product after tasting. | Rebate would help in sales | Is this on sale? | "Can I have the recipe?"
| Neutral, varied by individual. | Yes, consumers who sampled were more inclined to purchase | Halloween | Yes This is a great location for this product. | While some already knew and loved the brand, a number of customers were sampling for the first time. | Staff was helpful | Does it come in smaller bottles? | "This is a great cocktail!"
| No, they already knew and purchased before. | No, today this account wasn’t as busy as it could have been | Holiday | Yes, good pricing | Rebate helped in sales | Low stock | How much alcohol is in this product? | "I love the hats, shirts, and giveaways!"
| | Having samples and to go bags. | Thanksgiving | Account has a very loyal customer base that is very open to recommendations. | | Would have another event here but at a different time. | What cocktails can you make? | "This reminds me of being on vacation."
| | No. Customers had never heard of the product but in large part enjoyed the samples. | Home Collector | No, Account displays other types of drinks like beer | | One challenge was the price point. | | "I was coming in for something else, but you just changed my mind."
| | Yes, Explaining the process, distinctive differences and location increased customer interest. | Home Bar | No, Account has poor management focused on displaying seasonal items instead of drink brands. | | some customers mentioned it was a little early for them to sample | | "The sweet taste of the cocktail is amazing!"
| | | Favorite Drink | No account is focused on store brands only. | | Most customers were purchasing wines and champagne. | | "This is so different from what I usually drink; I’m impressed."
| | | Easter | No, customers commented price is too high | | | | several customers asked me for the recipe and took photos of the brand or mixers used
| | | Date Night | | | | | Wow, that’s better than I thought it would be! 
| | | Valentine’s | | | | | “Good Price”
| | | Beach | | | | |
| | | BBQ | | | | |
| | | Family Gathering | | | | |

================================================================================
FILE: HEMs Enhancement Questionnaire.xlsx
PATH: /Users/ethan/Library/CloudStorage/OneDrive-SharedLibraries-HartAgencyNY/Ambar-HART Teams Site - Documents/Ambar-Development/Current HEMs Application - Process- Examples/HEMS Questionnaire - Supplier Event Questions/HEMs Enhancement Questionnaire.xlsx
================================================================================
Sheets: ['Table Data', 'OnPrem Esplon', 'OffPrem Esplon', 'On Prem Campari', 'Off Prem Campari']

--- Sheet: Table Data (rows: 8, cols: 6) ---
| SOHO Questionnaire Table Data | | | |
| Event ID | Educator ID | Questionnaire ID | Premise | DateCompleted
Selection Type | AUTO | AUTO | AUTO | AUTO | AUTO
Data Type | | | | | DATE
Answers | | | | OnPremise |
| | | | OffPremise |

--- Sheet: OnPrem Esplon (rows: 12, cols: 27) ---
Esplon Tequila | | | | | | | | | | | | | | | | | P2 | | | | | | | | |
Questions | Was this a Covert Event Or Traditional Event? | # of Staff Trained | # of Atttendees | # of Consumers Reached | # of Consumers Sampled | # of Drinks Sold | # of CRM Sign ups | Conversion Rate | # of Giveaways Distributed | Total Account Spend | What was the drink you sampled? | What was the cost per drink? | Was it on feature/special ? Provide details. | Is the drink sampled included in a permanent menu listing in the account? | Demographics: predominat age of Consumer in attendance | Demographics: predominat sex of Consumer in attendance | If event was a Covert Event, was it primarily Promo Staff Led or Bartender Led? | Did the activation deviate any from planned programming? | Was there specific branding signage at the account? | Was this account a good fit for the program/would you recommend running additional promotions here? | Please provide any positive callouts | Please provide any opportunities or challenges | Was there competitive brand promotional activity? | Which similar competitors are displayed on backbar / have visibility POS in account? | What were the main questions asked by consumers during the sampling? | Consumer feedback and Quotes: Good and/or Bad
Help Explaination | | | | | | (Approx # of featured drinks(The one being sampled)sold during the timeframe of the promotion? This EXCLUDES the cocktails purchased by Campari as part of the promo(Account bartender/manager to provide this info) | | Calculated post recap | (insert items/giveaways) | | | | | | | | | | | | | | | | |
Selection Type | Single Selection | Manual input | Manual input | Manual input | Manual input | Manual input | Manual input | Calculated # of Drinks Sold vs # of Attendees | Manual input | Manual input | Single Selection | Manual input | Single Selection | Single Selection | Single Selection | Single Selection | Single Selection | Single Selection | Single Selection | Single Selection | Single Selection | Single Selection | Single Selection | Multiple Selection | Multiple Selection | Multiple Selection
Data Type | Text | Num(3) | Num(4) | Num(4) | Num(4) | Num(4) | Num(4) | Percent(2) | Num(4) | Dollar(6) | Text | Dollar(5) | Text | Text | Text | Text | Text | Text | Text | Text | Text | Text | Text | Text | Text | Text
Answer Type or Picklist | Convert Event | Manual Number Input | Manual Number Input | Manual Number Input | Manual Number Input | Manual Number Input | Manual Number Input | Percentage Auto Calculated | Manual Number Input | Manual$ Input | ***Need List here | Manual$ Input | ***Need List here | Yes | 21-30 | % Male | Yes | No | Yes | Yes Account as a good fit for the program with the right attendees and right crowd focus. | Bartends enjoyed making the cocktail | | | Contreau | |
| Traditional Event | | | | | | | | | | | | | No | 30-40 | % Female | No | Yes location started late. | No | Yes Account has a good fit with the right cocktail type focus. | | | | Apperal | |
| | | | | | | | | | | | | | | 40-50 | % Non-conforming | N/A | Yes had to subsitute ingrendient for cocktail. | | | | | | | |
| | | | | | | | | | | | | | | 50+ | | | | | | | | | | |
| Thumbnail 2 | | | | | | | | | | | | | | | | | | | | | | | | |

--- Sheet: OffPrem Esplon (rows: 20, cols: 37) ---
Esplon Tequila | | | | | | | | | | | | | | | P2 | | | | | | | | | | | | | | | | | | | | |
Questions | # of Staff Trained | # of Atttendees | # of Consumers Reached | # of Consumers Sampled | # of Drinks Sold | # of CRM Sign ups | Conversion Rate | Total Spend | Price of each Product Available | Demographics: predominat age of Consumer in attendance | Demographics: predominat sex of Consumer in attendance | What Percentage of Sampled consumers Have Heard of the Product Before? | What Percentage of Sampled consumers Have TIRED of the Product Before? | Did Consumer Perception Change after Sampling the Product? | Did the activation deviate any from planned programming? | Where is your setup located? | Describe the store's traffic | Was there a floor display? | Was there specific branding **\***Need rest | What bottle sizes were available for purchase? | Did you run out of stock? If so which formats did you run out of? | Was there any fearured pricing for the product being sampled? | What selling points worked best for the consumers? | What was the predominant occasion consumers were shopping for? | Was this a wet or dry market? | Was this account a good fit for the program/would you recommend running additional promotions? Explain. | Please provide any positive callouts | Please provide any opportunities or challenges | Was there competitive brand promotional activity? | (IF YES ) Was there competitive brand promotional activity what brands? | (IF YES) Was there competitive brand promotional activity? | (IF YES) Was there competitive brands pricing? | Was there any featured pricing? (** maybe a repeat does this mean for the event?) | What were the main questions asked by consumers during the sampling? | Consumer feedback and Quotes: Good and/or Bad | Account feedback and Quotes: Good and/or Bad
Help Explaination | | | | | (Approx # of featured drinks(The one being sampled)sold during the timeframe of the promotion? This EXCLUDES the cocktails purchased by Campari as part of the promo(Account bartender/manager to provide this info) | | Calculated post recap | (product, ice, Mizers) | | | | | | | | | | | | | | feature pricing is any price displayed which differs from the regular everyday price for this item. | | | | | | | | | | | | | |
Selection Type | Manual input | Manual input | Manual input | Manual input | Manual input | Manual input | Calculated # of Drinks Sold vs # of Attendees | Manual input | Manual input | Single Selection | Single Selection | Manual Input | Manual Input | Single Selection | Single Selection | Single Selection | Single Selection | Single Selection | Single Selection | Mulitple Selection | Mulitple Selection | Single Selection | Multiple Selection | Single Selection | Single Selection | Single Selection | Single Selection | Single Selection | Single Selection | Free Text | M | | Multiple Selection | Multiple Selection | Multiple Selection | Multiple Selection
Data Type | Num(3) | Num(4) | Num(4) | Num(4) | Num(4) | Num(4) | Percent(2) | Dollar(6) | Dollar(5) | Text | Text | Percentage(2) | Percentage(2) | Text | Text | Text | Text | Text | Text | Text | Text | Text | Text | Text | Text | Text | Text | Text | Text | Text | | | Text | Text | Text | Text
Answer Type or Picklist | Manual Number Input | Manual Number Input | Manual Number Input | Manual Number Input | Manual Number Input | Manual Number Input | Percentage Auto Calculated | Manual$ Input | Manual$ Input | 21-30 | % Male | Percentage(2) | Percentage(2) | Yes | No | High Traffic Location | Heavy | End Cap | Yes | 50ml | NO I did not run out of stock | No, product was regular priced. | \*\***Need List | Birthday Gift | Wet | **\*** | \***\* | \*\*** | Yes | | | | No, product was regular priced. | Where does the product come from? | |
| | | | | | | | | | 30-40 | % Female | | | No | Yes location started late. | Low Traffic Location | Medium | Case Stack | No | 200ml | 50ml | Yes, price was discounted with a sign display | | Sport event | Dry | | | | No | | | | Yes, price was discounted with a sign display | Is this new? | |
| | | | | | | | | | 40-50 | % Non-conforming | | | | Yes had to subsitute ingrendient for cocktail. | Near the Register | Slow | Shelf Only | | 375ml | 200ml | Yes, coupon was included on bottle | | Party | | | | | | **Need to determine the detail level required | **Need to determine the detail level required | | Yes, coupon was included on bottle | How much is it? | |
| | | | | | | | | | 50+ | | | | | | Near the Product Display | | Special Floor Display | | 750ml | 375ml | Yes, store advertised product with store coupon | | Friends getting together | | | | | | | | | Yes, store advertised product with store coupon | Is it available locally at a bar/restaruarnt? | |
| | | | | | | | | | | | | | | | | | Wire Rack | | 1 Liter | 750ml | | | Halloween | | | | | | | | | Yes, I provided coupons for this event | | |
| | | | | | | | | | | | | | | | | | No Floor Display | | 1.75L | 1 Liter | | | Holiday | | | | | | | | | | | |
| | | | | | | | | | | | | | | | | | | | | 1.75L | | | Thanksgiving | | | | | | | | | | | |
| | | | | | | | | | | | | | | | | | | | | | | | Collection | | | | | | | | | | | |
| | | | | | | | | | | | | | | | | | | | | | | | Home Bar | | | | | | | | | | | |
| | | | | | | | | | | | | | | | | | | | | | | | Favorite Drink | | | | | | | | | | | |
| | | | | | | | | | | | | | | | | | | | | | | | Easter | | | | | | | | | | | |
| | | | | | | | | | | | | | | | | | | | | | | | Date Night | | | | | | | | | | | |
| | | | | | | | | | | | | | | | | | | | | | | | Valentines | | | | | | | | | | | |
| | | | | | | | | | | | | | | | | | | | | | | | Beach | | | | | | | | | | | |

--- Sheet: On Prem Campari (rows: 8, cols: 13) ---
CAMPARI On | | On | On | | | | | | | On | On | On
Questions | After sampling did consumer perception change? Explain. | # of Consumers Sampled | ON PREMISE did you sell any drinks? | Was this account a good fit for the program/would you recommend running additional promotions here? | Please provide any positive callouts: | Please provide any opportunities or challenges | Please provide any opportunities or challenges | What was the main question asked by consumers during sampling? | Consumer feedback and quotes: | What was cocktail made/served? | Cost of cocktail ? | # of Giveaways Distributed
Help Explaination | | | | | | | | | | | | (insert items/giveaways)
Selection Type | Single Selection | Manual input | | Single Selection | Multiple Selection | Multiple Selection | Multiple Selection | Single Selection | Multiple Selection | Single Selection | Manual input | Manual input
Data Type | Text | Num(4) | | Text | Text | Text | Text | Text | Text | Text | Dollar(5) | Num(4)
Answer Type or Picklist | ***Insert Answers Here | Manual Number Input | | Yes Account as a good fit for the program with the right attendees and right crowd focus. | | | | | | ***Need List here | Manual$ Input | Manual Number Input
| | | | Yes Account has a good fit with the right cocktail type focus. | | | | | | | |

--- Sheet: Off Prem Campari (rows: 20, cols: 11) ---
CAMPARI Off | | Off | Off | Off | | | | | |
Questions | After sampling did consumer perception change? Explain. | Did event reach Bottles sold goal? | What was the predominant occasion consumers were shopping for? | Off Premise - What was the predominant occasion consumers were shopping for? | Was this account a good fit for the program/would you recommend running additional promotions here? | Please provide any positive callouts: | Please provide any opportunities or challenges | Please provide any opportunities or challenges | What was the main question asked by consumers during sampling? | Consumer feedback and quotes:
Help Explaination | | | | | | | | | |
Selection Type | Single Selection | Single Selection | Single Selection | Single Selection | Single Selection | Multiple Selection | Multiple Selection | Multiple Selection | Single Selection | Multiple Selection
Data Type | Text | Text | Text | Text | Text | Text | Text | Text | Text | Text
Answer Type or Picklist | ***Insert Answers Here | ***Insert Answers Here | Birthday Gift | Yes Account as a good fit with focus on cocktail ingredients for shopping. | Yes Account as a good fit for the program with the right attendees and right crowd focus. | | | | |
| | | Sport event | Yes Account | Yes Account has a good fit with the right cocktail type focus. | | | | |
| | | Party | | | | | | |
| | | Friends getting together | | | | | | |
| | | Halloween | | | | | | |
| | | Holiday | | | | | | |
| | | Thanksgiving | | | | | | |
| | | Collection | | | | | | |
| | | Home Bar | | | | | | |
| | | Favorite Drink | | | | | | |
| | | Easter | | | | | | |
| | | Date Night | | | | | | |
| | | Valentines | | | | | | |
| | | Beach | | | | | | |

================================================================================
FILE: HEMs - Platform (yourHART) Capabilities Matrix.xlsx
PATH: /Users/ethan/Library/CloudStorage/OneDrive-SharedLibraries-HartAgencyNY/Ambar-HART Teams Site - Documents/Ambar-Development/1 Technical Outlines/HEMs - Platform (yourHART) Capabilities Matrix.xlsx
================================================================================
Sheets: ['Sheet1', '4 Products Dev', 'Sheet2']

--- Sheet: Sheet1 (rows: 105, cols: 12) ---
| SaaS, Core, Affliate, Data Institute | | | | | | | | | |
| | | | | Ambar + Ai | | Affiliate Launch | | National Expansion Launch | |
| Category / Area | Capablities | HEMs Today | | Platform Build (Phase 1) | | Phase 2 Swagger Build | | Phase 2.5 Swagger Build | | Phase 3 Data Institute
| | | Current | | 8-10 Weeks from today | | 3-4 Months | | | | 5-12 Months
| HEMs App | Event Managment | Yes | | Yes | | Yes | | | | Yes
| HEMs App | Event Entry | Manual | | Semi Auto - AI Leverage | | Ai Leverage + Direct Connection (Dist/Supplier) | | | | Ai Leverage
| HEMs App | Event Requests | Manual | | Ai (Pilot) | | Yes (Market Ready) | | | | Native
| HEMs App | Manager - Process | Yes | | Updated Flow | | Yes (Market Ready) | | | | Native
| HEMs App | Wizard / Training | No | | Yes (Pilot) | | Yes (Market Ready) | | | | Native
| HEMs App | Educator Expenses | Manual | | Manual | | Ai Scanning Reciepts | | | | Ai Scanning Reciepts
| HEMs App | Account Management | Manual / Excel | | Dashboard (Pilot) | | Yes (Market Ready) | | | | Yes
| HEMs App | Item / Supplier Management | Yes In App | | Dashboard - Enhanced (Pilot) | | Yes (Market Ready) | | | | Yes
| Internal Processes | Payroll Functionality | Manual | | Manual | | Automations | | | | Automated
| Internal Processes | Event Assigment / Management | Yes / Manual | | Semi Auto | | Ai Leverage | | | | Ai Leverage
| Internal Processes | Billing Distributor | Manual / Semi | | Process Update | | Automated | | | | Automated
| Event Evaluation | Samples Setup | Manual | | Pilot | | Ai Leverage | | | | Ai Leverage
| Event Evaluation | Client Reporting | Manual / Email Share | | API/Manual/Web Access | | Reporting Suite + | | | | Reporting Suite + Data + Commerical Ops
| HART Operations Mapping | Samples Setup | Manual | | Manual | | New Operations Management | | | | New Operations Management
| Internal Processes | Educator Managment | No | | Yes (Pilot) | | Yes (Market Ready) | | | | Yes
| Educator Managmenet | Educator Scores / Auto Assigment | No | | No | | Yes (Pilot) | | | | Yes
| Educator Managmenet | Event and Educator Matching | Manual | | Yes (Pilot) | | Yes (Market Ready) | | | | Yes
| Educator Management | Cancellation Process | Manual | | Mobile App (Pilot) | | Yes (Market Ready) | | | | Yes
| Educator Effectiveness | Educator Brand Learning | Self Directed | | Self Directed | | App Build | | | | Yes
| Educator Effectiveness | Educator Brand Knowledge Score/Cat | No / Manual | | No / Manual | | Yes | | | | Yes
| HART Manager | Event Cancellation Process | Manual | | Enhancement (Pilot) | | Yes (Market Ready) | | | | Yes
| HART Manager | Educator Managment | Manual / Excel | | Dashboard (Pilot) | | Yes (Market Ready) | | | | Yes
| HEMs Platform (Stoli) SaaS | Multi Client (Supplier / Distributor) | No | | Yes (Pilot) | | Yes (Market Ready) | | | | Yes
| HEMs App (Stoli) | Multi Client (Supplier / Distributor) | No | | Yes (Pilot) | | Yes (Market Ready) | | | | Yes
| HEMs Platform (Affilate) | Multi Affiliate (Supplier / Distributor) | No | | Yes (Pilot) | | Yes (Market Ready) | | | | Native
| HEMs App (Affilate) | Multi Affiliate (Supplier / Distributor) | No | | Yes (Pilot) | | Yes (Market Ready) | | | | Native
| Help Desk | Issue / Ticket Support | Internal | | Internal | | Automated Helpdesk | | | | Professional Helpdesk
| Help Desk | Ai Help Bot | No | | No | | Automated Helpdesk | | | | Professional Helpdesk
| Mobile App | HEMs Mobile App | Yes | | New (Pilot) | | Yes (Market Ready) | | | | Native
| | HEMs Mobile App - Educator | Yes | | New (Pilot) - Updated | | Yes (Market Ready) | | | |
| Mobile App | Ongoing Surveys - Every Event | No | | New (Pilot) | | Yes (Market Ready) | | | | Native
| Mobile App | Multiple Client Access | No | | New (Pilot) | | Yes (Market Ready) | | | | Native
| Events Data | Consumer Collection | No | | Semi | | New (Pilot) | | | | Native
| Events Data | Account Data Collection | No | | New (Pilot) | | Yes (Market Ready) | | | | Native
| Events Data | Social Collection | No | | New (Pilot) | | Yes (Market Ready) | | | | Native
| Events Data | Brand Category Data Collection | No | | New (Pilot) | | Yes (Market Ready) | | | | Native
| Supplier Campaigns | Event | Manual | | Included | | Yes (Market Ready) | | | | Native
| Surveys / Questionaires | Account Surveys | Manual / Email / Outfield | | New (Pilot) | | Yes Ai Market Ready | | | | Native
| Surveys / Questionaires | Distrbutor Surveys | Manual / Email / Outfield | | New (Pilot) | | Yes Ai Market Ready | | | | Native
| Surveys / Questionaires | Supplier Surveys | Manual / Email / Outfield | | New (Pilot) | | Yes Ai Market Ready | | | | Native
| Surveys / Questionaires | Shelve Sets / Displays | Manual / Email / Outfield | | New Ai Image (Pilot) | | Yes Ai Market Ready | | | |
| Data Provider / Resell | Distributor Data Partner | Manual / Email | | API (Pilot) | | Yes (Market Ready for Clients | | | | Native - Resell
| Data Provider / Resell | VIP Data Partner | Manual / Email | | API (Pilot) | | Yes (Market Ready for Clients | | | | Native - Resell
| Data Provider / Resell | Consumer Profiles | N/A | | Yes (Pilot) | | Yes (Market Ready for Clients | | | | Native - Resell
| Data Provider / Resell | Account / Market Profile | N/A | | Yes (Pilot) | | Yes (Market Ready for Clients | | | | Native - Resell
| Data Provider / Resell | Menus - Food Restaruants | N/A | | Ai (Pilot) | | Yes (Market Ready for Clients | | | | Native - Resell
| Data Provider / Resell | Menus Drinks | N/A | | Ai (Pilot) | | Yes (Market Ready for Clients | | | | Native - Resell
| Data Provider / Resell | Market / Brand Targets | N/A | | Yes (Pilot) | | Yes (Market Ready for Clients | | | | Native - Resell
| Data Provider / Resell | Social Media - Events | N/A | | N/A | | Yes (Pilot) | | | | Native - Resell
| Data Provider / Resell | TPM - Trade Promotion Solutions | N/A | | N/A | | Yes (Pilot) | | | | Native - Resell
| Data Provider / Resell | Retailer Data Connection | N/A | | N/A | | Yes (Pilot) | | | | Native - Resell
| Data Provider / Resell | Trade Promotion Application | N/A | | N/A | | Yes (API) | | | | Native - Resell
| Data Provider / Resell | Business Intelligence (Team, Client) | N/A | | Yes API | | Yes (API, Ai Enhanced) | | | | Native - Resell
| Data Provider / Resell | Syndicated Data (Market, industry.etc) | N/A | | Yes API | | Yes (API, Ai Enhanced) | | | | Native - Resell
| Reporting / Data | Standard Event Report | Export | | Export / API | | Export / API / Portal | | | | Ai / Export / API / Portal
| Reporting / Data | Event Data API | Export | | Yes | | Native | | | | AI Leverage
| Reporting / Data | Event Reporting Suite | Manual / Email | | API (Pilot) | | Yes (Market Ready) | | | | AI Leverage
| Reporting / Data | Trade Promotion | Manual / Email | | API (Pilot) | | Yes (Market Ready) | | | | AI Leverage
| Reporting / Data | Distributor BI - Event Results/insights | Manual / Email | | API (Pilot) | | Yes (Market Ready) | | | | AI Leverage
| Reporting / Data | Supplier BI - Event Results/insights | Manual / Email | | API (Pilot) | | Yes (Market Ready) | | | | AI Leverage
| Reporting / Data | Event Insights | Export | | API (Pilot) | | Ai Insights | | | | AI Leverage
| Reporting / Data | Financial API | Manual / Email | | API (Pilot) | | Quickbooks/Etc | | | | Native
| Industry Clients | Wine / Spirits | Native | | Yes (Pilot) | | Yes (Market Ready) | | | | Native
| Industry Clients | Beer / RTS | Semi | | Yes (Pilot) | | Yes (Market Ready) | | | | Native
| Industry Clients | Food and Beverage | NA | | NA | | Yes (Pilot) | | | | Native
| Industry Clients | Cannabis | Semi | | Semi | | Yes (Pilot) | | | | Native
| Industry Clients | Data Collection (VIP, Circana) | Manual | | Semi | | Yes (Pilot) | | | | Native
| Industry Clients | Retailers / Food Distributors | Manual | | Semi | | Yes (Pilot) | | | | Native
| Industry Clients | National Chain (On/Off) | Manual | | Semi | | Yes (Pilot) | | | | Native
| Industry Clients | Trade Promotion Application | Manual | | Semi | | Yes (Pilot) | | | | Native
| Industry Clients | Business Intelligence | Manual | | Semi | | Yes (Pilot) | | | | Native
| Payment Management | Client Payment | Manual | | Manual | | Auto Payment / Web Setup | | | | Auto Payment / Web Setup
| Web Access / Website Portal | Client Setup / Services | Manual | | Self-Service (Pilot) | | Self- Service (Market Ready) | | | | Self- Service
| Web Access / Website Portal | Web Access - Hart Team | Internal Team | | Updated - Pilot | | New Platform | | | | Native
| Web Access / Website Portal | Web Access - Affliate | NA | | Yes (Pilot) | | Yes (Market Ready) | | | | Native
| Web Access / Website Portal | Web Access - Client | NA | | Yes (Pilot) | | Yes (Market Ready) | | | | Native
| National Provider Data/Operations | Syndicated Data | No | | No | | No | | | | Native
| National Provider Data/Operations | Trade Promotions | No | | No | | Yes (Pilot) | | | | Native
| National Provider Data/Operations | TPM - Trade Promotion Solution | No | | No | | Yes (Pilot) | | | | Native
| National Provider Data/Operations | Distributor Depletion Reporting (Comp VIP) | No | | No | | Yes (Pilot) | | | | Native
| National Provider Data/Operations | Supplier Depletions Reporting | No | | No | | Yes (Pilot) | | | | Native
| National Provider Data/Operations | Brand Team CRM | No | | No | | No | | | | Native
| National Provider Data/Operations | Commercial Planning | No | | No | | No | | | | Native

--- Sheet: 4 Products Dev (rows: 107, cols: 15) ---
| SaaS, Core, Affliate, Data Institute | | | | | | | | | | | | |
| | | | | Ambar + Ai | | Affiliate Launch | | National Expansion Launch | | | | |
| Category / Area | Capablities | HEMs Today | | SaaS HEMs (Platform) | | Phase 2 Swagger Build | | Phase 2.5 Swagger Build | SaaS | Core | Affiliate | | Phase 3 Data Institute
| | | Current | | 8-10 Weeks from today | | 3-4 Months | | | | | | | 5-12 Months
| HEMs App | Event Managment | Yes | | Yes | | Yes | | | | Yes | | | Yes
| HEMs App | Event Entry | Manual | | Semi Auto - AI Leverage | | Ai Leverage + Direct Connection (Dist/Supplier) | | | Semi Auto - AI Leverage | Ai Leverage + Direct Connection (Dist/Supplier) | Event Affliate - Ai Leverage | | Ai Leverage
| HEMs App | Event Requests | Manual | | Email Ai (Pilot) | | Yes (Market Ready) | | | Email Ai / Client Input | Email Ai / Operations Input | | | Native
| HEMs App | Manager - Process | Yes | | Updated Flow | | Yes (Market Ready) | | | Manager - Educator Management | Manager - Educator Management | Manager - Educator Management | | Native
| HEMs App | Wizard / Training | No | | Yes (Pilot) | | Yes (Market Ready) | | | | | | | Native
| HEMs App | Educator Expenses | Manual | | Manual | | Ai Scanning Reciepts | | | | | | | Ai Scanning Reciepts
| HEMs App | Account Management | Manual / Excel | | Dashboard (Pilot) | | Yes (Market Ready) | | | | | | | Yes
| HEMs App | Item / Supplier Management | Yes In App | | Dashboard - Enhanced (Pilot) | | Yes (Market Ready) | | | | | | | Yes
| HEMs App | Payroll | Yes In App | | | | | | | | | | |
| HEMs App | Billing / Event Costs / Event Exeuction | Yes In App | | | | | | | | | | |
| Internal Processes | Payroll Functionality | Manual | | Manual | | Automations | | | | | | | Automated
| Internal Processes | Event Assigment / Management | Yes / Manual | | Semi Auto | | Ai Leverage | | | | | | | Ai Leverage
| Internal Processes | Billing Distributor | Manual / Semi | | Process Update | | Automated | | | | | | | Automated
| Event Evaluation | Samples Setup | Manual | | Pilot | | Ai Leverage | | | | | | | Ai Leverage
| Event Evaluation | Client Reporting | Manual / Email Share | | API/Manual/Web Access | | Reporting Suite + | | | | | | | Reporting Suite + Data + Commerical Ops
| HART Operations Mapping | Samples Setup | Manual | | Manual | | New Operations Management | | | | | | | New Operations Management
| Internal Processes | Educator Managment | No | | Yes (Pilot) | | Yes (Market Ready) | | | | | | | Yes
| Educator Managmenet | Educator Scores / Auto Assigment | No | | No | | Yes (Pilot) | | | | | | | Yes
| Educator Managmenet | Event and Educator Matching | Manual | | Yes (Pilot) | | Yes (Market Ready) | | | | | | | Yes
| Educator Management | Cancellation Process | Manual | | Mobile App (Pilot) | | Yes (Market Ready) | | | | | | | Yes
| Educator Effectiveness | Educator Brand Learning | Self Directed | | Self Directed | | App Build | | | | | | | Yes
| Educator Effectiveness | Educator Brand Knowledge Score/Cat | No / Manual | | No / Manual | | Yes | | | | | | | Yes
| HART Manager | Event Cancellation Process | Manual | | Enhancement (Pilot) | | Yes (Market Ready) | | | | | | | Yes
| HART Manager | Educator Managment | Manual / Excel | | Dashboard (Pilot) | | Yes (Market Ready) | | | | | | | Yes
| HEMs Platform (Stoli) SaaS | Multi Client (Supplier / Distributor) | No | | Yes (Pilot) | | Yes (Market Ready) | | | | | | | Yes
| HEMs App (Stoli) | Multi Client (Supplier / Distributor) | No | | Yes (Pilot) | | Yes (Market Ready) | | | | | | | Yes
| HEMs Platform (Affilate) | Multi Affiliate (Supplier / Distributor) | No | | Yes (Pilot) | | Yes (Market Ready) | | | | | | | Native
| HEMs App (Affilate) | Multi Affiliate (Supplier / Distributor) | No | | Yes (Pilot) | | Yes (Market Ready) | | | | | | | Native
| Help Desk | Issue / Ticket Support | Internal | | Internal | | Automated Helpdesk | | | | | | | Professional Helpdesk
| Help Desk | Ai Help Bot | No | | No | | Automated Helpdesk | | | | | | | Professional Helpdesk
| Mobile App | HEMs Mobile App | Yes | | New (Pilot) | | Yes (Market Ready) | | | | | | | Native
| | HEMs Mobile App - Educator | Yes | | New (Pilot) - Updated | | Yes (Market Ready) | | | | | | |
| Mobile App | Ongoing Surveys - Every Event | No | | New (Pilot) | | Yes (Market Ready) | | | | | | | Native
| Mobile App | Multiple Client Access | No | | New (Pilot) | | Yes (Market Ready) | | | | | | | Native
| Events Data | Consumer Collection | No | | Semi | | New (Pilot) | | | | | | | Native
| Events Data | Account Data Collection | No | | New (Pilot) | | Yes (Market Ready) | | | | | | | Native
| Events Data | Social Collection | No | | New (Pilot) | | Yes (Market Ready) | | | | | | | Native
| Events Data | Brand Category Data Collection | No | | New (Pilot) | | Yes (Market Ready) | | | | | | | Native
| Supplier Campaigns | Event | Manual | | Included | | Yes (Market Ready) | | | | | | | Native
| Surveys / Questionaires | Account Surveys | Manual / Email / Outfield | | New (Pilot) | | Yes Ai Market Ready | | | | | | | Native
| Surveys / Questionaires | Distrbutor Surveys | Manual / Email / Outfield | | New (Pilot) | | Yes Ai Market Ready | | | | | | | Native
| Surveys / Questionaires | Supplier Surveys | Manual / Email / Outfield | | New (Pilot) | | Yes Ai Market Ready | | | | | | | Native
| Surveys / Questionaires | Shelve Sets / Displays | Manual / Email / Outfield | | New Ai Image (Pilot) | | Yes Ai Market Ready | | | | | | |
| Data Provider / Resell | Distributor Data Partner | Manual / Email | | API (Pilot) | | Yes (Market Ready for Clients | | | | | | | Native - Resell
| Data Provider / Resell | VIP Data Partner | Manual / Email | | API (Pilot) | | Yes (Market Ready for Clients | | | | | | | Native - Resell
| Data Provider / Resell | Consumer Profiles | N/A | | Yes (Pilot) | | Yes (Market Ready for Clients | | | | | | | Native - Resell
| Data Provider / Resell | Account / Market Profile | N/A | | Yes (Pilot) | | Yes (Market Ready for Clients | | | | | | | Native - Resell
| Data Provider / Resell | Menus - Food Restaruants | N/A | | Ai (Pilot) | | Yes (Market Ready for Clients | | | | | | | Native - Resell
| Data Provider / Resell | Menus Drinks | N/A | | Ai (Pilot) | | Yes (Market Ready for Clients | | | | | | | Native - Resell
| Data Provider / Resell | Market / Brand Targets | N/A | | Yes (Pilot) | | Yes (Market Ready for Clients | | | | | | | Native - Resell
| Data Provider / Resell | Social Media - Events | N/A | | N/A | | Yes (Pilot) | | | | | | | Native - Resell
| Data Provider / Resell | TPM - Trade Promotion Solutions | N/A | | N/A | | Yes (Pilot) | | | | | | | Native - Resell
| Data Provider / Resell | Retailer Data Connection | N/A | | N/A | | Yes (Pilot) | | | | | | | Native - Resell
| Data Provider / Resell | Trade Promotion Application | N/A | | N/A | | Yes (API) | | | | | | | Native - Resell
| Data Provider / Resell | Business Intelligence (Team, Client) | N/A | | Yes API | | Yes (API, Ai Enhanced) | | | | | | | Native - Resell
| Data Provider / Resell | Syndicated Data (Market, industry.etc) | N/A | | Yes API | | Yes (API, Ai Enhanced) | | | | | | | Native - Resell
| Reporting / Data | Standard Event Report | Export | | Export / API | | Export / API / Portal | | | | | | | Ai / Export / API / Portal
| Reporting / Data | Event Data API | Export | | Yes | | Native | | | | | | | AI Leverage
| Reporting / Data | Event Reporting Suite | Manual / Email | | API (Pilot) | | Yes (Market Ready) | | | | | | | AI Leverage
| Reporting / Data | Trade Promotion | Manual / Email | | API (Pilot) | | Yes (Market Ready) | | | | | | | AI Leverage
| Reporting / Data | Distributor BI - Event Results/insights | Manual / Email | | API (Pilot) | | Yes (Market Ready) | | | | | | | AI Leverage
| Reporting / Data | Supplier BI - Event Results/insights | Manual / Email | | API (Pilot) | | Yes (Market Ready) | | | | | | | AI Leverage
| Reporting / Data | Event Insights | Export | | API (Pilot) | | Ai Insights | | | | | | | AI Leverage
| Reporting / Data | Financial API | Manual / Email | | API (Pilot) | | Quickbooks/Etc | | | | | | | Native
| Industry Clients | Wine / Spirits | Native | | Yes (Pilot) | | Yes (Market Ready) | | | | | | | Native
| Industry Clients | Beer / RTS | Semi | | Yes (Pilot) | | Yes (Market Ready) | | | | | | | Native
| Industry Clients | Food and Beverage | NA | | NA | | Yes (Pilot) | | | | | | | Native
| Industry Clients | Cannabis | Semi | | Semi | | Yes (Pilot) | | | | | | | Native
| Industry Clients | Data Collection (VIP, Circana) | Manual | | Semi | | Yes (Pilot) | | | | | | | Native
| Industry Clients | Retailers / Food Distributors | Manual | | Semi | | Yes (Pilot) | | | | | | | Native
| Industry Clients | National Chain (On/Off) | Manual | | Semi | | Yes (Pilot) | | | | | | | Native
| Industry Clients | Trade Promotion Application | Manual | | Semi | | Yes (Pilot) | | | | | | | Native
| Industry Clients | Business Intelligence | Manual | | Semi | | Yes (Pilot) | | | | | | | Native
| Payment Management | Client Payment | Manual | | Manual | | Auto Payment / Web Setup | | | | | | | Auto Payment / Web Setup
| Web Access / Website Portal | Client Setup / Services | Manual | | Self-Service (Pilot) | | Self- Service (Market Ready) | | | | | | | Self- Service
| Web Access / Website Portal | Web Access - Hart Team | Internal Team | | Updated - Pilot | | New Platform | | | | | | | Native
| Web Access / Website Portal | Web Access - Affliate | NA | | Yes (Pilot) | | Yes (Market Ready) | | | | | | | Native
| Web Access / Website Portal | Web Access - Client | NA | | Yes (Pilot) | | Yes (Market Ready) | | | | | | | Native
| National Provider Data/Operations | Syndicated Data | No | | No | | No | | | | | | | Native
| National Provider Data/Operations | Trade Promotions | No | | No | | Yes (Pilot) | | | | | | | Native
| National Provider Data/Operations | TPM - Trade Promotion Solution | No | | No | | Yes (Pilot) | | | | | | | Native
| National Provider Data/Operations | Distributor Depletion Reporting (Comp VIP) | No | | No | | Yes (Pilot) | | | | | | | Native
| National Provider Data/Operations | Supplier Depletions Reporting | No | | No | | Yes (Pilot) | | | | | | | Native
| National Provider Data/Operations | Brand Team CRM | No | | No | | No | | | | | | | Native
| National Provider Data/Operations | Commercial Planning | No | | No | | No | | | | | | | Native

--- Sheet: Sheet2 (rows: 1, cols: 1) ---

================================================================================
EXTRACTION COMPLETE
================================================================================

################################################################################
################################################################################

##

## SECTION 6: IMAGE DESCRIPTIONS (png)

##

################################################################################
################################################################################

================================================================================
FILE: Current HEMs Reporting Examples/Screenshot 2026-01-30 164024.png
================================================================================
Floor plan or layout diagram for a retail/event space. Grayscale schematic with labeled rectangular shapes representing fixtures or display units with alphanumeric codes like "ECA-15". Appears to be a photograph of a computer screen.

================================================================================
FILE: Current HEMs Reporting Examples/Core HEMs - Campaign Reporting Jameson Example.png
================================================================================
HEMs campaign reporting interface for a JAMESON (LOBBY SAMPLING) event.

- Event time: 04:30 PM to 07:00 PM
- Consumers Sampled: 70
- Drinks Purchased: 0, Bottles Sold: 0, Conversion Rate: 0%
- Gender: Male 60%, Female 40%
- Age: 21-29: 10%, 30-39: 30%, 40-50: 30%, 51+: 30%
- Ethnicity: Caucasian 60%, Hispanic 10%, African American 10%, Eastern European 10%, Asian 10%

================================================================================
FILE: HEMS Questionnaire - Supplier Event Questions/thumbnail_image001.png
FILE: HEMS Questionnaire - Supplier Event Questions/thumbnail_image001 (1).png
FILE: HEMS Questionnaire - Supplier Event Questions/thumbnail_image001 (2).png
================================================================================
Three versions of the "Excellent Execution - Sampling Compliance" Event Report Form (ERF) templates.

OFF PREMISE ERF (thumbnail_image001.png and (1).png):
Three columns:

1. Qualitative Data: activation deviation, setup location, store traffic, floor display type (end cap, case stack, shelf only, special floor display, wire rack, none), branded signage, stock-outs, featured pricing, selling points, consumer occasion, wet/dry market, account fit, positive callouts, challenges, competitive activity, consumer questions, account feedback, food pairings
2. Quantitative Data: staff trained, attendees, consumers reached/sampled, sample type (VSOP/XO/Both), samples distributed, bottles sold by size, total spend, product prices, demographics (age groups: 21-30, 30-40, 40-50, 50+; sex: Male/Female/Non-conforming), % heard of product before, % tried before, perception change
3. Event Photos: 15-20 photos required (product on shelf w/ prices, on display, floor display, competitor displays, promo staff in uniform, sampling setup, guests with POS, interior/exterior, competitive activity)

ON PREMISE ERF (thumbnail_image001 (2).png):
For "Covert Events or Traditional Events":

- Quantitative: staff trained, attendees, consumers reached/sampled, drinks sold, consumer buy-back %, total event cost, drink details
- Demographics: predominant age of consumers
- Qualitative: covert vs promo staff/bartender, branding/signage, activation deviation, account fit, callouts, challenges, competitive activity, cocktail/food pairing list, consumer questions, account feedback
- Traditional photos: 15-20 (promo staff, featured drinks, signage, engagement, promotional materials, interior/exterior)
- Covert photos: 10-15 per event
- Template branded with Espolon tequila (Campari Group)

Note at bottom: "National BAs and/or Campari Academy to provide pairing guidance"

################################################################################
################################################################################

##

## SECTION 7: PRESENTATION (pptx)

##

################################################################################
################################################################################

================================================================================
FILE: Current HEMs Reporting Examples/Fall Survey Recap-2024 sgws with Regional breakouts.pptx
(22-slide SGWS Fall Holiday Survey presentation)
================================================================================

Title: SGWS FALL HOLIDAY SURVEY

Overall Metrics:

- 24,453 total displays (avg 27 per store, up from 23 in Summer 2024 and 18 in Holiday 2024)
- 906 total accounts, 869 surveyed
- 56 surveyors across NYS
- Average survey time: 10.21 minutes

Displays & Cold Box by Distributor (Statewide):

- SGWS: 14,212 displays / 4,460 cold box
- Empire: 6,443 displays / 2,605 cold box
- RNDC: 1,850 displays / 1,127 cold box
- Coastal: 1,250 displays

Spirits Display Share (Statewide):

- SGWS: 62.6% (down 0.4% YoY)
- Empire: 25.4% (up 1.0%)
- Coastal: 10.0% (down 1.6%)
- RNDC: 2.0% (up 1.0%)

Wine Display Share (Statewide):

- SGWS: 56.7% (flat YoY)
- Empire: 27.3% (down 0.4%)
- RNDC: 15.9% (up 0.4%)

91% of stores statewide display spirits; 86% display wine

Regional Breakouts (13 regions with Nov-24 vs Nov-23 comparisons):
Albany, Bronx, Brooklyn, Buffalo, Hudson, Manhattan, Nassau, Queens, Rochester, Staten Island, Suffolk, Syracuse, Westchester

Key pattern: Empire entered cold box category in 2024 with 0 presence in 2023, typically gaining 28-36% share.
Each region shows Spirits/Wine/Cold Box display share by wholesaler with YoY growth metrics.

################################################################################

##

## FILES NOT PROCESSED

##

################################################################################

The following files could not be converted to text:

- Ambar-Development/Current HEMs Application - Process- Examples/HEMs WebApp Event Flow (Dev).mp4 (video)
- Ambar-Development/Current HEMs Application - Process- Examples/HEMs Webapp Tour.mp4 (video)
- Ambar-Development/1 Technical Outlines/HART - TECH VISION Diagram and Platfrom.vsdx (Visio diagram)

################################################################################
################################################################################

##

## SECTION 8: VISIO DIAGRAM (converted)

## Source: HART - TECH VISION Diagram and Platfrom.vsdx

## Full Mermaid version: tech-vision-diagram.md

##

################################################################################
################################################################################

The Visio file contains 16 pages covering the full HART platform technical vision.
Full Mermaid diagrams: tech-vision-diagram.md

PAGE 1 — STRATEGIC VISION & THREE PILLARS
Mission: Leader of consumer education providing brands directed, deep, actionable, and timely competitive insight into the US Market.
Vision: Redefine brands competitive advantage fusing in-person experiences, with timely market vision, and digital mastery into actionable insights.
Strategy — Three areas to attack:
Pillar 1 (Operations Effectiveness): REV – SAVE MAN HOURS, Internal/Operational Efficiencies, Foundation/Client Value
Apps: HART HEMs – Educator Management, HART Ai – Events (Chat/Processing), HART Ai – Event Deep Insights (Analytics)
Pillar 2 (Client Value – New Revenue): Who do we now serve? How/What do we offer? What makes us more sexy partner?
Apps: HART Ai – Events Booking Guidance, HART Ai – Analytics, HART Market Guide Data (rev), HART Survey App – Market Data
Pillar 3 (HEMs Platform / Affiliate Future): Global Suppliers, ALL Distributors, HEMs Platform Transformation
Apps: HART Platform – Event Management, HART Ai – Event Deep Insights, HART Market Guide Data (rev)

PAGE 2 — CURRENT HEMS ARCHITECTURE (AS-IS)
Cloud AWS containing: HEMs App Database, Crossbox Database
HEMs Application (Current): HEM Application Web, Event/Educator Management
Market – Event Execution Assignment: Assign Event/Account to Educator/Date, Calendar Date/Time, Event Promotion Type
Event Activities – Data Collection and Results: Educators, Retail Account Off Premise, Retail Account On Premise, Consumers Sampling, Account Survey, Special Events (Trade Shows)
Client Layer: Distributor Client, Supplier Client
Client Roles: Supplier Commercial Team, Distributor Trade Development, Distributor Sales Manager, Educator Managers, HART Office Operations
Billing: Distributor Billing (SLA), Supplier Finance (Billing), Billing and Budgets
Survey: Retail Data Collection, Survey of Accounts

PAGE 3 — PLATFORM PORTAL ADDITION (PHASE 1)
Same as Page 2 plus: HEMS PLATFORM PORTAL (new), AI Helpdesk/How To (×5 instances across system)

PAGES 4-5 — AI SURVEY APP & IMAGE RECOGNITION PIPELINE
Added: HART AI Survey Management
Pre-Execution Product AI Learning:

- ID Brands to Be Surveyed (e.g., Moet Henn) → Add Data to Master Item Data → SGProof Website Train on Images
- ID Comp Brands to Be Surveyed (e.g., Mumm) → same pipeline
- Uses: Item Master, Supplier Master, AI Image Recon Data
  Single Account Survey – Educator Flow:

1. Educator Enters Account → 2. Select Account Location → 3. Take Photo → 4. AI Form Fill → 5. Accept/Change Form Inputs → 6. Select Next Location (in-store) → 7. Repeat for all Tasks on Survey
   Results: Single Location / Single Point in Retail → Survey Results Completed and Verified → Listed Output of Data
   Survey Template Setup → Set Survey Activation Date → Account Master

PAGE 6 — USE CASES
Use Cases / Needs / Pain / Revenue Sources: AI CHAT BOT, AI Event Processing, Emailed Events

PAGES 7-8 — AI EMAIL EVENT PROCESSING FLOW (DETAILED)
Full AI-powered event creation from email:

1. Email Received → Validate Email Account User → Confirm or Reject
2. Determine Supplier or Distributor → Type of Request (New Event / Change Event)
3. Check for Images/Attachments (filter signature images), Scan for Virus
4. Determine number of Events Requested (By Product, by Location, by Date)
5. AI Read Email, match to Form Data. Capture Email Notes, Save Email & Create Hyperlink
6. Event Field Form Data (per event):
   - Supplier (determined by Sender) → CB Match Supplier Key
   - Product → CB Match Product Key
   - # Sample Bottles
   - Event Name (Optional)
   - Date of Event, Time of Event From and To
   - Account Location Name → CB Account Key
   - Distributor (determined by Product v Location) → CB Match Distributor Key
   - Assign Event Email Key ID (Each Event)
7. Check Data against Crossbox MDM
8. Can all Fields be ID'd via AI or Crossbox?
   Yes → Push Form Event Data to HEMs → Add Each Event to Manager List
   No → Reply branches:
   1. Missing Field(s)
   2. Unrecognized Field Data
   3. Event Dates too close to current date
   4. Event Undetermined
   5. Event Updated – need more info
      1a) New Event(s) – Confirmation of Receipt
9. HEMs Application – Hart Team Event Approval/Management
   Human Approval → Manual Add Educator Assignment
   Or: Human Edit Email/Field Data → loop back to AI extraction
10. AI Generate Email Response Summary → Email Confirmation
11. Data: Update Event Data, Update Event Master Data → HEMs App → Crossbox Database
12. AI Learns on Edits and Changes to Email
    Tree Key: Hart AI, Hart Team, Data Action, Hart AI Action, Process, Sub Process

PAGE 9 — FULL DATABASE SCHEMA (TABLE DEFINITIONS)
Complete schema with column types. Key tables:
accounts_details: id, user_id, company, secondary_name, account_affluency, liquor_license, manhattan_beer_id, winebow_id, opici_id, empire_id, southern_id, southern_td_cd, premise_id, transportation_notes, private_admin_notes, blacklist_status/notes, logo, referred_by
companies: id, company, hart_company, secondary_name, account_affluency, image, email, phone, website, fax, cell_phone, liquor_license, [distributor IDs: manhattan_beer_id, winebow_id, opici_id, empire_id, southern_id, southern_td_cd], premise_id, account_size, company_address_id, company_type (supplier|distributor|account), division_id, status, rating_enabled, has_email
evaluations: id, event_id, educator_id, status, notes, consumers_sampled, consumers_approached, promotion_location (front|back), general_market, weather (sunny|cloudy|rain|warm|cold), door_traffic (heavy|moderate|slow), account_size, educator_feedback, consumer_feedback, competitors, competitors_pricing, setup_location, pos, male_percent, female_percent, cocktail_featured, approved_user, drink_menu, back_bar, feature_drink_price, is_complete, is_primary, source, rebate, ibotta, consumer_education, bar_spend, engraver_on_site
events: id, event_name, event_status_id, premise_id, grand_or_large, wet_dry (W|D), date, parent_event_date, time_from, time_to, approve_event, special_event, cancelled_event, engraving_event, event_type_id, note_to_educators, educator_id, distributor_id, distributor_contact, supplier_id, supplier_contact, reconciliation_status
event_invoices: id, bill_to_id, bill_to_contact_id, company, address, city, state, zip, invoice_amount, billing_promo, billing_company, billing_account, batch_id, invoice_id, transaction_id, transaction_date
products: id, name, image, type, sub_type, distributor_id, supplier_id, summary, status, inventory, website
event_products: id, event_id, product_id, sample_bottles, kit_issued, out_of_stock
distributor_details: id, user_id, company, hart_company, private_admin_note, blacklist_status/notes, avatar, referred_by
supplier_details: id, user_id, company, private_admin_note, blacklist_status/notes, logo, referred_by
Additional tables: job_roles, programs, states, promo_codes, divisions, permissions, premises, territories, quickbook_batches, quickbook_options, migrations

PAGE 10 — DATABASE DOMAIN ORGANIZATION
Domain sections: 1) HEMs Application Support Tables, 2) Dimensions (Suppliers, Distributors, Geography), 3) Supplier Product - Item, 4) Event / Promotion / Billing / HART Org – Educators, 5) Account Evaluation – HEMs Educator Results, 6) Assets Links – Educators (Videos, Training, Presentation decks), 7) HEMs Educator Profile / Employee Profiles, 8) Accounts (Retailers)

PAGE 11 — STRATEGIC PRODUCT MAPPING
Current clients: SGWS, Pernod mapped to systems: Crossbox, HEMs
Three task boards (placeholders): Internal/Operational Efficiencies (×8 tasks), HEMs Platform Transformation (×8 tasks)

PAGE 12 — CROSSBOX DATA ARCHITECTURE & INTEGRATIONS
Data Sources: HEMS Prod Database, PINATA, GSC, SGWS Account Data
AWS CROSS BOX Database contains: MASTER TABLE DATA, HEM APP DATA, Trade/Event Marketing Data
Reporting: API, Reporting Views, POWER BI
Outputs: SGWS SLA EXPORT, SLA EXCEL DOCS, Supplier Portal, Distributor Portal, CooperCast Integration
Data: SGWS SLA Data, Program Event Data, Event Results Data
HART Management

PAGE 13 — FULL ECOSYSTEM: EVENT EXECUTION + DATA PARTNERS + AI
Account types: Retailer/Chain/Event/On-Prem Account
Event/Educator Management: HEM Application Web, Educators, Calendar, Promotion Type, AI Educator Management, $ Cost / Billing
External Data Partners: HIPSTR, Master Visual Item Data, Google Analytics
Data Outputs: Consumer Data, Survey Data, Retailer Data, Event Execution Data, Retail Depletions Sales Data

PAGES 14-15 — HEMS APPLICATION: BACK MANAGEMENT + MOBILE APP
Two-tier architecture:
HEMs Application – Back Management:
HEM Application Web, Event/Educator Management
Actors: Educator Managers, HART Office Operations
Functions: Assign Event/Account to Educator/Date, Calendar, Promotion Type, $ Cost / Billing and Budgets
HEM – Apple App / Android App (Educator Manager Level):
Educators, Assign Event/Account to Educator/Date, Calendar, Promotion Type
Field: Retail On Premise, Retail Off Premise, Special Events, Consumers Sampling, Account Survey
Both connect to: HEMs App Database → Crossbox Database (Cloud AWS)

PAGE 16 — CROSSBOX DATA WAREHOUSE & MASTER DATA ARCHITECTURE
Organization Model (×3): SaaS Client, HART Core, Affiliate → HART CRM MASTER
Product/Account Hierarchy: Distributor Clients → Supplier → Region → Geography → State → Market → Channel → Chain → Account; Brand → Line → Item
Product Classification: Cannabis, Beer, Wine/Spirits, Food, Beverage
Master Data Sources: State Alcohol Board, Web Scraping Item Port from Distributor, Distributor API/Manual File, Supplier API/Manual File
Key Identifiers: Distributor and Supplier Item Code, Invoice Market Code/Distributor Warehouse Location, Sales/Supplier ID, TDLink/Distributor
HART Team: HART Educators Table, HART Manager Table
Analytics: Key Account Segmentation + Reporting, Gap Total Account Universe, VIP Universe Outlet File
Activity: Campaign, Activities (Events/Surveys), Activity Details, Activity Results, Event/Activity Survey
Performance: Campaign/Event ROI ($ vs Sales), Account Depletions, Distributor Sales Persons
KGI – Dashboards
HART Data Intelli: HART Supplier, Distributor, Campaign
Single Supplier View → Data Origin: Account Master, Item Master
Azure Data Tables, Chain Grouping Table
HART Data Collection Organization (SaaS/Core/Affiliate): Channels, Supplier Profile

AWS Infrastructure (from separate doc):

- VPC: vpc-cf77a7b5 (N. Virginia)
- Production: RDS MySQL (portal-myhems-prod.cz90ylzkqopr.us-east-1.rds.amazonaws.com), S3 (myhems-prod)
- Staging: Local MySQL on EC2, S3 (myhems-demo)
- AI Services in development: intake_api, classifier, menu_extractor

Mar 11, 2026

## Ambar / Hart \- Definition Call 1/4 \- Transcript

### 00:00:00

   
**Joe Green:** But um what we wanted to go through today, we've got a few like questions and bits to um that we want to like clarify quickly at the start and then  
**Christopher Azrak:** Okay.  
**Joe Green:** basically we're going to get stuck into um some of the uh prototypes we've been um creating um to start showing you some of those interfaces, some of the things we've been um playing around with. They are like very like early stage. So even though we have followed the um uh the heart like branding um and styling, it's by no means you know you know ignore the colors to a certain degree. Uh we're really focusing on kind of functionality and through that and hopefully these conversations we'll then be able to like iterate, refine the mental models and and kind of uh adjust stuff a little bit in terms of how we're creating and defining the features and functionalities. Um yeah, the first question though, I know you I think you caught up with with Lewis yesterday and raised a point around uh account masters and I think item masters.  
   
 

### 00:01:13

   
**Joe Green:** Um and I've watched back kind of the demo and I think I have an understanding of what they are and why they exist, but it'd be good to hear from just to talk through that quickly from your side to just make sure that we are clear on the requirements there.  
**Christopher Azrak:** So we have a schema already that the app utilizes but the nice part is the schema's already been developed where it's not just it it's it's a fairly good organization of the data and if as we go down this journey becoming more of like a data institute we need to make ensure that we're capturing the information for our own purposes for the application properly and for sharing outwardly because some of the requirements that we need um and some of the things I outlined in the technical outline in terms of functionality is APIing. So with our clients they have they have a lot their own uh business intelligence and and they have their own their own data. So, us having a good item master, not with just keys that are industry standard or identifiers that are industry standard.  
   
 

### 00:02:15

   
**Christopher Azrak:** Um, that's coming, but having having an item master where we're capturing the right information. Same thing with the account account information so that this can then be lined up with with other data insights and analytics.  
**Joe Green:** Okay, cool. And is that still managed like on a client level? Um, so you'll have like an account master and item master attached to like each client  
**Christopher Azrak:** No,  
**Joe Green:** account.  
**Christopher Azrak:** we so we would have our own so heart would have our own master.  
**Joe Green:** Okay.  
**Christopher Azrak:** The um everyone's everyone's structure is going to be the same.  
**Joe Green:** Mhm.  
**Christopher Azrak:** The only differences would would be the hierarchy in terms of the organizations would would be different. Um and following the organization would be be the the actual brands. um when you go get into like like and this this when when we do the full-on engagement getting you into the AWS server and seeing the current structure I think it'll start making a little more sense because for the clients we have a table that manages who the supplier is who the distributors are and the brands and sorry the items go back and forth between distributors and suppliers because the distributors work with them work with them.  
   
 

### 00:03:35

   
**Christopher Azrak:** There's identifiers that go go with them. There's keys that go with them. Same thing with our suppliers and they both share the accounts but a lot of times we get account information from the distributor as to their identification of what that account count is. Um, so when we start we start looking at say the schema, what I want to make sure we take into consideration early as we start going down this journey foundationally is making sure that we're we're taking in consideration not just what's good for the app but what's good for reporting purposes when we start APIing this over and when we start bringing in other other data sources and to give you a bit of a glimpse like some of the things that we're talking about is bring in distributor sales which are known as depletions, which are invoices that the distributor sells and sells to retailers. That's that information we would want to line up with the things that we do because in our industry, we don't get registered sales at the retail, but we do know what gets bought in by the retail from the distributor.  
   
 

### 00:04:36

   
**Christopher Azrak:** So, lining that up with those sales and saying, "These accounts bought x amount of product. We did this in this event. The next month they bought and bought more. We can start and then driving deriving the actual sales velocity and the influence of doing these events and put a dollar figure on it.  
**Joe Green:** Okay, cool. Okay. Yeah, that makes sense from a like a heart ops perspective. Um, that's super helpful. Any any questions from like uh Ethan or Raphael on or Lewis on that on that point?  
**Ethan Brown:** Uh I don't think so. I'm I will be looking forward to seeing the actual uh data  
**Christopher Azrak:** Yeah, I I I think it's in the the share drive and I apologize.  
**Ethan Brown:** obviously.  
**Christopher Azrak:** I've been under the weather this past couple of days. I haven't had a chance to move a few more things into that share drive, but there is but I do have some diagrams. Um, and I do have some some data diagrams.  
**Ethan Brown:** Great.  
**Christopher Azrak:** I don't have the schema per se, but I do have a collection of all the tables and what what those categorize as.  
   
 

### 00:05:46

   
**Christopher Azrak:** Um I'm moving everything over into into that that folder, but I have a VIO that has all those tables of what's available. That'll be helpful for you guys at least to see what it is. You won't have the schema how this all connects, but it's pretty fairly simple.  
**Joe Green:** Yeah.  
**Christopher Azrak:** These are the accounts. These are the brands. these this is the execution around around the data and I'm I'm envisioning us not copying this but recreating this that that it's that's maximized because I I I it's good and I know I've done a lot of data in the industry where it's it's a decent schema um and I don't mind sharing the schema that I have that I use for my company for beverage alcohol as well since I have a way that I'm capturing a lot of the sales part it's not around the accounts sorry not around the market executions, but it shows from a supplier perspective as to how they would organize their data. And I think that would also would be helpful for you guys just from seeing that and saying, "Oh, okay, maybe this is a way we can adapt this from a marketing sense for art.  
   
 

### 00:06:49

   
**Joe Green:** Cool. Uh yeah, that'd be super helpful. Just um yeah, drop it into the the share drive and then just ping us when um when it's ready and we can we can go in and have a look at that. Sweet.  
**Christopher Azrak:** Cool.  
**Joe Green:** Um, last quick question uh just before we get into the more uh the prototypes themselves, but from a brand guideline perspective. I know um like Ethan uh emailed and it's it's pretty loose. I guess I just wanted to check like obviously we're keeping like the logo and like the core color palette. Beyond that, is it kind of we've got creative creative license, creative freedom to a certain degree to expand that for the new apps?  
**Christopher Azrak:** We we do um we have a new CMO who who just got onboarded last week and she's putting together some of the some of the the visual communications.  
**Joe Green:** Yeah,  
**Christopher Azrak:** So I would say we can put that we can go with what whatever you guys have right now it's fine. This is still like you know very very early on anyways.  
   
 

### 00:07:50

   
**Christopher Azrak:** I'm not nitpicky when it comes to a lot of the pictures and things until we get to the end because I see that as a polish stage than it is trying trying to change colors as we go along.  
**Joe Green:** for sure.  
**Christopher Azrak:** I would just say just try to make it as uniform as possible so that when we start getting into this then we can start easily changing them as opposed to having to go through and change a lot of different different colors all over the  
**Joe Green:** Yeah. Yeah. No, definitely.  
**Christopher Azrak:** place.  
**Joe Green:** We'll um we'll keep it simple. But yeah, that that makes sense. Just wanted to double check that before um before we got too far.  
**Christopher Azrak:** Sure.  
**Joe Green:** Cool. All right. In that case, then um yeah, we get stuck into the the fun stuff and start going through some of the the prototypes. So, um, yeah, Raphael, if if all good with you to, um, share your screen, then we can start start running through some of the progress.  
   
 

### 00:08:33

   
**Joe Green:** And, um, yeah, Chris, feel free to obviously ask any questions,  
**Christopher Azrak:** Great.  
**Joe Green:** um, kind of prompt us on anything as, as we go through as well. But, um, yeah, we getting stuck in  
**Rafael Ricco:** Yep. Let me share my screen. So, okay, let's see. Okay, here's the prototype running. Okay. So the first thing we I did um is the welcome screen the the signing that the the application will start from this from that point. For example, here we could uh navigate to forget password or fill the credentials or um just sign in with biometrics and let's follow this path that's we will the application will emulate how the authentication flow will happen and here we will  
**Christopher Azrak:** Are we sorry?  
**Rafael Ricco:** have that  
**Christopher Azrak:** Are we looking at the mobile application or are we looking at the web application?  
**Joe Green:** the mobile app.  
**Rafael Ricco:** is Yes.  
**Joe Green:** The educator mobile app.  
**Christopher Azrak:** Okay.  
**Rafael Ricco:** Yes.  
**Christopher Azrak:** Okay.  
**Joe Green:** Sorry.  
**Christopher Azrak:** I was I was going to say and say most people don't have the biometrics on their laptops.  
   
 

### 00:09:56

   
**Rafael Ricco:** Yes.  
**Christopher Azrak:** So I just want to make sure about that.  
**Rafael Ricco:** Yes.  
**Christopher Azrak:** Okay.  
**Rafael Ricco:** Okay. So,  
**Joe Green:** Yeah.  
**Rafael Ricco:** uh here uh we have two different types upcoming events and also past events and we could navigate through this page and let's see for example the checkin process. Okay, that that is the the page for the event. you we could we could see the the details about the product instructions and materials goals compensation contacts and etc. So okay. So let's navigate to the checkin page. Okay. So ready to check in and verify the location that is emulating the okay location verify. Awesome. So here is the page locked to for the educator. And here the educator needs to complete the tasks. In that case there's three task three different tasks. The task for consumer profiling sales tracking and venue intelligence. And yeah. So  
**Christopher Azrak:** I like the clock too because then that's that's kind of just showing how how much time you have have to to be there to remain  
   
 

### 00:11:14

   
**Rafael Ricco:** yes and also uh when remain uh when the time is is  
**Christopher Azrak:** there.  
**Rafael Ricco:** is coming uh to the end um they probably will see a notification uh saying something like hey uh your time is ending. you don't uh complete the tasks. Complete the tasks and u yeah let's navigate to to consumer consumer uh profiling. That's a very very quick and easy to interact. It's just uh one tap for uh the questions and they okay one consumer profile it so let's navigate for the next and that is how the consumer profile happens  
**Christopher Azrak:** Okay. So then that that creates a counter for each one.  
**Rafael Ricco:** that's  
**Christopher Azrak:** That's pretty that's pretty good. Okay.  
**Joe Green:** one.  
**Rafael Ricco:** Yes.  
**Joe Green:** Um, sorry Raphael, just just to jump in. One question I had when we were like reviewing this on on our side, like this is obviously quite a basic one,  
**Rafael Ricco:** Yeah.  
**Joe Green:** but I assume you'd the customers or would want the ability to like customize their customer profiling or would it be like fixed all the  
   
 

### 00:12:26

   
**Christopher Azrak:** So, we have something we call questionnaires and the questionnaires would have some specific  
**Joe Green:** time?  
**Christopher Azrak:** um questions and I believe it's I'll double check to make sure you guys have the example in the folder.  
**Joe Green:** Yeah, similar.  
**Christopher Azrak:** Um but there is a there is one where where there's some we what we did and I was part of this this enhancement. We created some canned responses because to be honest, people are people. They're going to have the same responses over and over and over and over again. So, it can it contains what those responses are. Um, so, but yes, to to there could be some where it could be special where maybe somebody wants to try out the way the bottle looks and ask do they recognize that there's a new bottle and what what the feedback is on that like thing that. So yes, that would be important.  
**Joe Green:** Okay, cool.  
**Rafael Ricco:** Okay. Uh so let's go back and now like we we can see the customer profiling is done and let's uh move to sales tracking and that is a very very important part that uh the educator will scan products of course that is a simulation but that is a uh how I imagine the this feature happens for example that they will take the the  
   
 

### 00:13:39

   
**Christopher Azrak:** Cool.  
**Rafael Ricco:** photo and the AI I will analyze and like ping uh the products the AI found and like we can see in this example they they we have a missing one here and for example okay how can I add missing products and we could add manually here or just increase here and that is a way that we could use the help from AI to to identify products and and just  
**Christopher Azrak:** So on this part I can tell you and we're launching it now over the next two weeks.  
**Rafael Ricco:** manually  
**Christopher Azrak:** I had only because our engagement timing and timing didn't didn't coincide. So I do have an AI tool that's been trained on alcohol bottles and the way the interface were working is similar to this. Whereas instead of creating a list vertically like this, it basically simulates what the shelf set looks like. So for where each each node is and it's a little more in depth in terms of what the product is confirm and allows allows the the user to confirm it and to ensure that is that is what it is.  
   
 

### 00:15:08

   
**Christopher Azrak:** Um the number of facings and the price price point on on the shelf. So this and and just just for the the sake of of naming conventions, it wouldn't be called sales tracking because we're not tracking necessarily any sales. It would be certain surveying. And it's a little more in depth, but this is this is a good stab because we do want to incorporate this functionality as a as a task to be done within the account. So, I'm also saying too is don't spend too much time spit polishing this because I've got an outline already for  
**Rafael Ricco:** Okay.  
**Christopher Azrak:** that and you guys are going to have a a MVP to help in integrate with it. And looking at the designs, there's a huge amount of documentation as to how it works and all that. So, it should make integrating it in much easier. And like I said, it's already been trained in a lot of the bottles.  
**Joe Green:** Amazing.  
**Christopher Azrak:** It's already been trained on shelf sets within the space. So, and so that that should make this a little bit easier to to integrate.  
   
 

### 00:16:11

   
**Christopher Azrak:** But I would I think think as a placeholder just from functionality, I think we need to have rename it to survey as opposed to sales tracking.  
**Rafael Ricco:** Okay, awesome. So, yeah, let's let's save. Okay. Uh let's go to the last task, the vano intelligence. And  
**Christopher Azrak:** Oh, okay. Okay. Okay. Okay.  
**Rafael Ricco:** here  
**Christopher Azrak:** So, now I get Okay. So, then sorry.  
**Rafael Ricco:** no  
**Christopher Azrak:** Let me let me back up here a second then.  
**Rafael Ricco:** problem.  
**Christopher Azrak:** What do you guys see as the sales int the sales tracking versus the venue intelligence?  
**Rafael Ricco:** It's because the here the the functionality it's slightly slightly different. For example, um here they could take a lot of pictures. Of course,  
**Christopher Azrak:** Okay.  
**Rafael Ricco:** we are simulating the the pictures and and they could uh hold and speak  
**Christopher Azrak:** Of course.  
**Rafael Ricco:** something for for add for example add a note about all data they collected they have collected in the event and that is the same for for example for menu and back bar they could take a lot of pictures and that's will and this will be like a documentation or the documentation the educator uh grab from the the event and they they save this and at the end we will have something  
   
 

### 00:17:41

   
**Rafael Ricco:** like this checkout page and we it's will be possible to see for example the all data they have collected uh sales tracking and we could see a lot of informations here about the the  
**Christopher Azrak:** Okay. So you are on the right path. So sales tracking. Yes. Because during the events and it will differ between the type of type of venue in terms of premise. Um because there's there's two different flows. There's there's one for the on-remise where we wouldn't be selling drinks in say a bar. We would we would have our own spend and we would serve those. So knowing how many drinks have been served is important. So that that does and there's a billing process that goes back to that that is important. So having that functionality is good. And in the off- premise say like like a um Tesco or you know Costco or or like a Kroger, you you would go in and report how many how many bottles that you you think as the educator you sold during that event.  
   
 

### 00:18:53

   
**Christopher Azrak:** And a lot of times with that action, you would confirm it with with retailer by going going to them and saying, "Hey, I think I sold this many." And he would report that back back. So that is so I I I the the picture functionality and the sales tracking I don't think that's necessary for the AI to derive that. It's more of a manual input because I don't think there's anything that would that would show that. um the venue intelligence. That's basically what that survey AI have does is is basically mixes that venue intelligence. Click on the on the venue intelligence real quick.  
**Rafael Ricco:** F intelligence. So  
**Christopher Azrak:** So if you can't go back to the to to the Yeah,  
**Rafael Ricco:** let's  
**Christopher Azrak:** click click on the venue intelligence. So like what you have for the the photo and taking the photo and what you did for the the sales tracking essentially that's what the survey tool does. So you'd we what we would want to do and this goes back to the the data is is we we for the account profile we want to track how many displays are in the account how many cold boxes if there's wind windows so all the things that we're surveying we're keeping tabs and creating a profile as to what that account is so this all works with that and that photo functionality you like you have the AI would would then look at the shelf and part and try to figure figure out what's on the shelf.  
   
 

### 00:20:16

   
**Christopher Azrak:** So you can So So this is this is extremely close like in in a matter of week having this as a foundation start from is is really cool.  
**Joe Green:** Cool. Yeah, that that makes sense then. So it's more like building that a AI functionality within like the the venue intelligence so people can just quickly snap this is the shelf this is the cool call box  
**Christopher Azrak:** And some of the some of the initial feedback I'm getting is we might need them to take a picture and walk away and come back  
**Joe Green:** etc.  
**Christopher Azrak:** and fill it out later because if they have the picture, they can see what's there.  
**Joe Green:** Yeah.  
**Christopher Azrak:** And not that we're trying to be um like not not that we're trying to be sly about doing these surveys, but a lot of times retailers don't want us to survey the account sometimes. And most of the time it they know we're going to do it. But if we're going to do this all the time, we don't want somebody standing in in the account with like their iPad or phone like doing this because  
   
 

### 00:21:08

   
**Joe Green:** Yeah. Yeah.  
**Christopher Azrak:** it's obvious that what they're doing.  
**Joe Green:** Okay. Yeah.  
**Christopher Azrak:** So coming up and taking a picture and then walking away,  
**Joe Green:** Yeah.  
**Christopher Azrak:** have the AI build it and then maybe they go back to their car and they fill it in is  
**Joe Green:** Okay.  
**Christopher Azrak:** perfect.  
**Joe Green:** Nice. Yeah, that's good to know. And for the for the sales tracking, um, is that again something that people like tend to do like postevent or like would you want would they have like their items kind of pre uploaded like before the event and then it's just again like almost a counter across different products. It's like okay I've just sold like three of those like add  
**Christopher Azrak:** So from a from an event structure is going back to the item master being linked into there with this campaign.  
**Joe Green:** three.  
**Christopher Azrak:** We know what products I'm going to be done going to be sampled in this this campaign. So for the sales that would that would be what would populate there.  
   
 

### 00:21:55

   
**Christopher Azrak:** So, so me being so me being me being the um the event educator, the educator, what I would do is I I would basically have a whole bunch of bottles out for customers to try and try to pick up and I would try to promote it and I would try to entice them to take a bottle home. So, for that sales tracker, I would just want to be able to click off how many I think I I sold during the event. And from a process standpoint at the end of the event, I probably would go to go to the retail manager and say, "Hey, I think I sold how many here." And a lot of times that they can check their register and see how many were sold during the time frame. And then I can confirm it that way.  
**Joe Green:** Yeah.  
**Christopher Azrak:** Or at least if I have it checked off,  
**Joe Green:** Yeah.  
**Christopher Azrak:** then that's good enough for us where we can say we we think we had this many sales.  
**Joe Green:** Okay, cool. Yeah, that's good for  
   
 

### 00:22:47

   
**Rafael Ricco:** Yep. Cool. So let's proceed to check out.  
**Joe Green:** me.  
**Rafael Ricco:** Check out is just a visualization of all information collected during the event. And let's verify location to check out.  
**Christopher Azrak:** Sorry if I'm looking down.  
**Rafael Ricco:** Um  
**Christopher Azrak:** I'm not ignoring you because I have our our mobile app pulled up here and I'm just just mirroring with you and just just kind of get get a feel for you know one to one what you guys have just in the matter of a week and what we  
**Rafael Ricco:** Okay.  
**Christopher Azrak:** have  
**Rafael Ricco:** Okay. So that's basically it. And uh going back to pass event, we will have basically the same uh section uh to visualizate the summary of the all data collected during the event.  
**Christopher Azrak:** Cool.  
**Rafael Ricco:** And besides that we also have the the settings the settings uh page with offial permissions and things and similar uh related stuff and that's  
**Christopher Azrak:** So I will give you this is this is nice in one week just to have something to talk talk  
   
 

### 00:23:52

   
**Rafael Ricco:** it.  
**Christopher Azrak:** about right now and visuals like this and interactions like this from a UI perspective. This makes it very easy for us to talk and talk visually around things. I would say you're and this is a very very good start. The big thing that needs to be front and center is um availability and having a calendar functionality built into here because one of the things that we're I'm instituting is from a process standpoint is to have the educators communicate via the app more because and Louiswis and I would talk about this actually Ethan we talked about this last week a lot of the communication currently happens over the phone text messages emails on the side sometimes. And what's necessary is to have the educators constantly updating their availability as far out as possible so that the app and the managers the app can just say, "Okay, we have this this event that came up now. We need to book it in the next three days. Who's available?" If that if we have a process in place where the educators are managing that the app can figure that  
   
 

### 00:25:09

   
**Christopher Azrak:** out so that the managers don't have to pick up the phone and we can and we can then institute a process with the educators that they have to man manage that and maintain it constantly. So, and so have and one of the things we're we're doing right now is we're moving that as a tab front and center. So that's a reminder and we and some of the ideas came up with some of the managers maybe even having something that pings them once in a while to hey don't forget to update update your availability so that they remember to update their availability.  
**Rafael Ricco:** cool.  
**Christopher Azrak:** See?  
**Joe Green:** Cool.  
**Rafael Ricco:** So um also worth take a look in the activate account that is a on boarding that is like on boarding when the the educator receive or receive a link to uh for a link of invitation or that is the first time the the educator uh enter in the application. in that in this case they need to to fill the the password here. Uh okay. Does that need?  
   
 

### 00:26:16

   
**Rafael Ricco:** Okay. So let's activate the accounts.  
**Christopher Azrak:** follow by metrics, local access, push notifications. Um,  
**Rafael Ricco:** Yes.  
**Christopher Azrak:** all those things need to be mandatory and it's one of the things we were talking about with the push notifications and location. And we've had issues just from a process standpoint where where the app doesn't work because of those functions because of those things were turned off. So I think having all that is mandatory or else it just doesn't work. It's fine especially since we're compensating them. And that's one of my arguments I've had with with our current setup is we're paying them for these for for doing these things. Like it needs to be mandatory or else the app doesn't work and they don't they can't do anything which means they don't get paid.  
**Rafael Ricco:** Okay, cool. So,  
**Christopher Azrak:** And I'll give you sorry I'll give you one other other bit of feedback. And it may not be for this initial run but one of the things that we also include is um PDFs on the information of the event like how do you how do you um how do you serve the drink?  
   
 

### 00:27:25

   
**Christopher Azrak:** What drinks are served? Information about the brand. Some of the considerations that I've had on on the road map is to set up some sort of education process where the educator could be certified on the brands because it's the same clients we we service over and over and over again. And in the case of like say Absolute, Absolute doesn't really change unless there's a new product. um they give us the the scripts then the all the a lot of the information and one of the things I've I've talked about because these educators walk in a lot of times and they prepare very very quickly having educators pre-qualified like knowing who's been been qualified for this so that they get priority um would be helpful and having quick access to all that. You'll see in you'll see that um in part of the sampling process there's something that's called an evaluation and it's a very very poor important misnomer. Essentially, that is a sheet of paper that has all the brand information, the setup information, and it's physical so that if there's something wrong with your phone or it's also attached to the samples, too.  
   
 

### 00:28:41

   
**Christopher Azrak:** And it also it has been utilized as a piece of paper where the educator can write down how many bottles they sold and gather some of the feedback and check off how many how many people they they've sampled. So, a lot of that that information needs to be bubbled up in in the app in some form of way from an education standpoint and execution. You've got a lot of that already here. So, that's great. And you guys will see when I think think if you if you saw the the video, then you saw a lot of the areas where that information is put in. And I think there's room for um some deeper capturing because what we're doing right now is the notes are kind of a catchall for some for  
**Rafael Ricco:** Oops.  
**Christopher Azrak:** things.  
**Joe Green:** Yeah.  
**Christopher Azrak:** And I'll be honest with you, I don't even know how many different categories and things we can add on to it. But it being a catchall is a problem because then we're not capturing this information as data.  
   
 

### 00:29:31

   
**Joe Green:** Cool.  
**Christopher Azrak:** It's a visual. And the only reason the only way that's being regurgitated is because when we go in for the event and we'll grab this campaign and just copy and paste it and those notes are already in there.  
**Joe Green:** Yeah, that makes  
**Rafael Ricco:** And the the last thing the last thing is the offline mode because uh in  
**Joe Green:** sense.  
**Christopher Azrak:** Sure.  
**Rafael Ricco:** this prototype I put a few um a few banners to be uh displayed for the user uh for  
**Christopher Azrak:** Uh  
**Rafael Ricco:** they know okay so you are  
**Christopher Azrak:** oh.  
**Rafael Ricco:** offline but you  
**Christopher Azrak:** You're You're breaking up,  
**Rafael Ricco:** But you can um save all data here and everything will be in sync when when you you you back home.  
**Christopher Azrak:** Raphael.  
**Rafael Ricco:** Oh my god.  
**Christopher Azrak:** Okay, you're back now.  
**Rafael Ricco:** Hello. Hello. Hello.  
**Joe Green:** Yeah, that's better now.  
**Rafael Ricco:** So what's  
**Joe Green:** You just went a bit uh bit choppy for for a few minutes there, but I think it's okay again now.  
   
 

### 00:30:42

   
**Rafael Ricco:** it? It's because the offline mode. Okay, I put the in offline mode the browser and the browser really on on offline mode. But what I'm saying is uh sorry for that. So um what I'm saying is because the the app the prototype here is uh was I think in the offline mode and the user the educator could could do everything like like if they have internet without internet and this application will be  
**Christopher Azrak:** in and a lot of these locations, especially in New York City,  
**Rafael Ricco:** uh  
**Christopher Azrak:** the internet is very spotty. There's a lot of old buildings with very thick walls. And in the past,  
**Rafael Ricco:** Mhm.  
**Christopher Azrak:** we've had major issues where the if if it's if it needs to up upload immediately,  
**Rafael Ricco:** Mhm.  
**Christopher Azrak:** it doesn't and then we have an error and then the surveys don't get completed. So having an offline mode, having the ability to save the pictures and then upload it later is extremely important, extremely.  
**Rafael Ricco:** Yes.  
**Christopher Azrak:** And we've noticed too that just because of the spottiness a lot of times that the current app design does not work that well um if if it doesn't have a good connection or if it doesn't get started with a good connection.  
   
 

### 00:31:52

   
**Rafael Ricco:** Amazing.  
**Christopher Azrak:** So that that's all important. Great.  
**Rafael Ricco:** So that's that's it from my  
**Christopher Azrak:** This is a great great first step I think having something visual like this to work off of.  
**Rafael Ricco:** side.  
**Christopher Azrak:** I'm not going to nitpick you on all the little things I've got in this process that you guys have currently. There's already some outlines that are in here around the um educator cancellation man management and but that's all details we can get into for later on. But this makes it easy for us to have a have a jumping point off of. So this is good.  
**Rafael Ricco:** Thanks.  
**Joe Green:** I am muted. Um sorry. Yeah, that's uh really really helpful feedback. Um uh and lots of stuff for us to think about and update on as well. Um I think considering the time Raphael, it might be worth quickly showing the uh um the like heart ops dashboard that you uh have been working on as well. Just to kind of put that in front of uh Chris as well.  
   
 

### 00:33:04

   
**Joe Green:** We can have a think about it.  
**Rafael Ricco:** Yep. Um, let me share my screen  
**Joe Green:** Sorry, I put you on the spot there, but uh just we got a bit of time.  
**Rafael Ricco:** again.  
**Joe Green:** Um again, I think it's useful conversations to have.  
**Rafael Ricco:** So, okay. start uh from the ops or staff  
**Joe Green:** uh staff side. Sorry, I know we haven't um looked at the op side,  
**Rafael Ricco:** side.  
**Joe Green:** but this the staff side uh like web app experience.  
**Rafael Ricco:** Okay. So, Um let's see. Okay, here is the the signing page for the platform. In that case, we will start doing the login in staff platform. And let's just click here. So that is the staff platform site and here that is the the dashboard just uh showing the performance trends and and total samples customer research uh customer reach and total sales etc. And okay we have a a few uh sections here sections for dashboard campaigns events reports brand assets settings. Uh let's start with uh campaigns.  
   
 

### 00:34:50

   
**Rafael Ricco:** So here we could create a new campaign. For example, my  
**Christopher Azrak:** and and right here. So, this is what I'm talking about when it comes to like the profiling.  
**Rafael Ricco:** campaign  
**Christopher Azrak:** This is a good start. So, please don't take this as as negative criticism. So like with the campaigns, linking that over to more more more things like um which which suppliers, which distributors, what what markets um what's and there's so much more that goes in that campaign in terms of how many are we anticipating on doing and which which products which items items are tied and tied to that. Like all that information is important because that that will all trickle into the events. Because if you think about the hierarchy, the campaign is then the high and higher level from an event execution and all the events are all like the activities that go along with that campaign.  
**Rafael Ricco:** Okay. So, um Okay, let's let's select some  
**Christopher Azrak:** You can create it. I'm sorry. I don't didn't want to stop you from from creating.  
   
 

### 00:35:52

   
**Rafael Ricco:** uh Yeah.  
**Christopher Azrak:** I just was just giving you the feedback.  
**Rafael Ricco:** Yeah. No, no worries. So let's select the campaign and uh let's see this campaign. Okay. So here is the events inside this campaign and we have here a few uh filters for um draft scheduled active or completed events. And the most exciting part is the part for events. We have here two different ways to visualize the events in list or calendar. And here we could create events and that is the core process for this platform. For example, the first step is selecting the com select the campaign we will put this event in and okay let's select this campaign and then fill the event name my event and dash location everything here is just a prototype any data is save it is just uh unstate so our let's select promise here we need to select the objectives and brand awareness and let's select all to see and for example here they will generate the report for intelligent report preview and that is how the the report looks like that is a report  
   
 

### 00:37:27

   
**Christopher Azrak:** So what is this?  
**Rafael Ricco:** preview so uh that is a a document that is a a a document If all data compiled for the and at the end they could uh download on report section.  
**Christopher Azrak:** So is this measuring Lewis raised his hand?  
**Luis Galeas:** Yeah. So I was going to point out uh that you know um I alluded to this uh to this yesterday as well and other times when I was saying that the experience we should have should be that you should be seeing the output instead of playing questionnaire builder right away. I mean you can play question builder at some point of course uh but that in the um in the definition of hey I'd like to build an event you should be very results based when you uh when you see what's going to happen.  
**Christopher Azrak:** So this is starting off with what what's anticipated of of doing this event under this  
**Luis Galeas:** Yeah. Yep. Yep.  
**Christopher Azrak:** campaign.  
**Luis Galeas:** And obviously these are example things. Uh they're not the actual you cannot  
   
 

### 00:38:42

   
**Christopher Azrak:** Okay. And so I'm I'm I'm and and I think all this is very interesting to me like the brand awareness score the um educate education driver sales like being anticipated of that. I think this is cool. It's this is this is going to be very interesting in terms of presenting this back to leadership and the management because I I love this. It's going to be very interesting to flip the script on the way everyone thinks because we're so the way the business is currently is around just executions. It's not about being prescriptive of of the best executions and where and  
**Joe Green:** H.  
**Christopher Azrak:** timing. Um, and I would say this, like some of the connections that you're making here when when the events are assigned to um, educators or accounts and and if we already have past history and analytics on past similar events, then that could be be also been served back to our clients and saying, "Hey, so you told we're we're doing this campaign and we think you should do these these accounts on these days just just from from the sake of of what we have on on the data and be more prescriptive that that way as a as a suggestion.  
   
 

### 00:40:02

   
**Christopher Azrak:** So all this is linked into all that and that's the way I'm seeing that we can we can resell this because this is money that and decisions that we don't make.  
**Luis Galeas:** Yeah,  
**Christopher Azrak:** So if we could be if we can if we could be um analytically persuasive and show the value and saying hey you've got this campaign this is the direction you need to go this is perfect and and and and that it would just be need to be flipped where you're not trying to convince the person who's setting up the event it needs to be a way that communicates to the client in some form or fashion um and I will say this Lewis for for this  
**Luis Galeas:** exactly.  
**Christopher Azrak:** goound because the um the test client that we're doing this with, they would be looking at this as they're building it. So, this would be a benefit to them because for them, they're owning the entire process and utilizing this our software to do it. So, they're seeing this analytics. Then the next question they're going to have is okay, this brand awareness was is there anything low on here?  
   
 

### 00:41:02

   
**Christopher Azrak:** The sales drive is it looks yellow maybe. what could I do to tweak this to make this a better better execution? So that's going to be the next question that comes out out of their head. So if there so it this is good but then you always have to be prepared for that that next tweak is okay if this is not not going to be projected as good what do I need to do to make this better?  
**Luis Galeas:** Yeah, that's ter  
**Ethan Brown:** I think that'd be an ideal I think that that that's an ideal opportunity for some, you know, AI involvements,  
**Christopher Azrak:** I  
**Ethan Brown:** suggesting things that uh you should be paying attention to and then what you can do to respond to them.  
**Christopher Azrak:** agree. I agree. And then going back to like Joe and I know I keep tying this back into if we have an account master  
**Joe Green:** Mhm.  
**Christopher Azrak:** and these account profiles and now we know more about these accounts and we're capt capturing that on ongoing so the AI can then learn more about the types of accounts what sort of things you're doing in there  
   
 

### 00:42:01

   
**Joe Green:** Yeah. Exactly.  
**Christopher Azrak:** and now it's can be more prescriptive and saying hey we're going to do this event you're doing this in Brooklyn I think you should do these this list of accounts on these  
**Joe Green:** Yeah. Yeah, it can get smarter and smarter every time as well. Really cool  
**Christopher Azrak:** Yep. I love it. Good.  
**Joe Green:** stuff.  
**Christopher Azrak:** Really good direction.  
**Rafael Ricco:** Let's continue. So, additional modules. Um, let's add add all to see. And here we go. So here is the event the let's schedule the event. Okay, the event is scheduled. So let's start the event. Here is the the real simulation about how the the data has been collected.  
**Christopher Azrak:** Okay,  
**Rafael Ricco:** That is the view. Um let's wait to  
**Christopher Azrak:** while while that's going the step in between here and I'm going to have a deeper  
**Rafael Ricco:** finish.  
**Christopher Azrak:** outline. So there's the operation side where the operation captures the request in for the events and how that gets built.  
   
 

### 00:43:10

   
**Christopher Azrak:** Then when that is solidified and the event is solidified, the assignment of the educator falls on the managers to do that. So that's where the app comes into place and saying the here's the availability of these people. This is their skill set of these people line that up and have the mana and the manager the manager then takes over from the process of assigning who can who get who who to what event on what days.  
**Rafael Ricco:** So, um, yeah. So, here we go. Let's lock the report. Okay. So after lock the report all data is locked and read only and cannot be changed and and also we could uh download the report and see the all data collected during this event and that's basically it for the events part event side and let's jump to reports side. So okay um report side is u it's a a condensed uh section with all data from this uh this platform. For example, we could uh apply the filter for the data collected in the last 30 days and also see uh things for example related with performance trends uh events total samples customers reach total sales a lot of in uh information here and also uh options to download this information in PDF.  
   
 

### 00:45:06

   
**Rafael Ricco:** format or CSV and that is a a general overview for the all things happens uh in the last 30 days and also we could navigate  
**Christopher Azrak:** Okay,  
**Rafael Ricco:** here to the images and inspect all data. Okay,  
**Christopher Azrak:** cool.  
**Rafael Ricco:** so let's move to brand assets. So here we could manage the products and for example uh edit products manually or use the feature to auto upload uh products and yeah that's that's basically that's a a crude to we could add a new product here. So let's try here.  
**Christopher Azrak:** And this is where this is and linking in the the item master.  
**Joe Green:** She's Thanks Where?  
**Christopher Azrak:** This is where having the item master linked with this becomes very powerful because when you go back to the mobile app, you can then communicate visually to the educator what the bottle looks like, not making any assumptions of that and we're utilizing the brand assets. So that that makes one point of truth where we're updating this. Sometimes brands do do some updates, but a lot of times they'll do do of events and activities on new brands that no one's ever seen before.  
   
 

### 00:46:25

   
**Christopher Azrak:** So, it's always important to have what those visuals look like so that the educator knows what what they need to look for and what they're promoting.  
**Rafael Ricco:** Yes. Cool. So also the help resources uh like questions with answers here that could that could help uh to understand uh specific specific subjects. For example, how many samples should each customer receive or any kind of questions or help resources could be placed here. And also um finally the the settings page and the settings we could uh edit the the username, the images uh notification uh and here we could configure the notifications for email, push notification, inapp notifications and toggle all things here and save as a save the preferences and also visual visualize the team uh preference. preferences. Another preferences for the default time framing we could set as a 30 last 30 days. And finally integrations that is very experimental. It's just for demonstration. But uh yeah, we could have something like this. Yes,  
**Christopher Azrak:** Cool.  
**Rafael Ricco:** that's that's basically it for the staff uh the staff dashboard.  
   
 

### 00:47:52

   
**Christopher Azrak:** Very cool. I think this is this is a good good starting off point and I think from a a basic framework this is a good good start. um getting into the like the details and I'll default to you guys how you want to uh capture this as capabilities that that would mimic what we currently have. Um I'm just double checking here. There should be current hems did not put that in there. So, we do have a form that that is not being completely utilized, but has the minimum that's needed to to put in for an event. I'll make sure I get that uploaded into the current Hems application document folder so you can see what what's in there, what what's what's needed to be captured.  
**Joe Green:** Mhm.  
**Christopher Azrak:** You basically have like 80% 90% of what what needs to be there. It's a lot of the color on on the different things, the the questions and tasks. I know this is all prototyping. So that thing and you do have like some of the activities there.  
   
 

### 00:48:55

   
**Christopher Azrak:** I think the thing where we can get deeper into later on is like the the tweaking in terms of for those activities not just executing it. There's there's there's general general things like we do all the time like the surveying all the time and then there's stuff I I call questionnaires where it's specific to that those those campaigns and events that would need to be tweaked and and I'm just letting you know that was something we've always struggled with the current application because that had to be hardcoded in and having something where we could put in some loose information but have it repeated where we're now now holding on to Because going back to like your your your your question, Joe, like a lot of the suppliers ask the same questions every single year, every single month. So being able to to handle that as data where now we can just take all those answers and then from a from and then um summarize them together all the answers. Um that would be that that's all stuff that we've added in currently and it's all just checking off like the responses essentially.  
   
 

### 00:50:03

   
**Christopher Azrak:** No, this is cool. This is in in just literally one week. This is this is a good starting point where there's a lot lot of meat here and I and I agree with Lewis and showing the outputs up front is extremely important and that's going to flip everyone's thinking and and to the the test pilot this is going to blow their mind because from their perspective this is their money. So from their perspective, seeing how effective this is going to be and some projections off of that is going to be very powerful as you start build these campaigns. And I will say this, knowing the competition, no one's doing that right now.  
**Joe Green:** Yeah.  
**Christopher Azrak:** Nobody.  
**Joe Green:** Yeah. Cool. Yeah. One um one question I have I still you know exploring the the setup process and particularly like around like educator managers. I think we still need to um kind of define that and and explore that. But as part of the event creation process, is that when an educator manager gets defined?  
   
 

### 00:51:06

   
**Joe Green:** Um,  
**Christopher Azrak:** Yes.  
**Joe Green:** or is that does that happen like a little bit later as a like a  
**Christopher Azrak:** Yes. So, so the so the managers are tied to geography.  
**Joe Green:** process?  
**Christopher Azrak:** So when you're when you're creating the events, you're assigning the geography for the for so the individual event is going to be assigned to an individual account. So that account is tied to the geography of of the managers.  
**Joe Green:** Mhm.  
**Christopher Azrak:** So that's that's where that that gets connected. So from a process standpoint,  
**Joe Green:** Okay.  
**Christopher Azrak:** the campaign's created first and then we'll get the requests for the events in later as the event as the events requests come in and those event requests are assigned at the account level in specific days. So we would individ you would individually add in that part. That's why I was saying having as much detail in the campaign easier for for creating the events because then that's just pull from the campaign and regurgitate it. Just assign sign the account and the date and time and then the  
   
 

### 00:52:05

   
**Joe Green:** Yeah. Yeah.  
**Christopher Azrak:** manager gets not notification once that's sent over to the manager to assign the educator. So having having it have having having that the educators to pull from as to who's available who matches the the geography because we try to we try to to put and put the educators that from their home their home address close to the event so they don't have to drive two three hours away. So have having that geol location where it knows the address of the the account and the address of the the educator and say here's availability and here's the score of the educators. These are the people you should you should consider and then that gets offered to to the educator like because they're not employees. It's it's it's it's basically a suggestion saying hey we have this opportunity. Do you accept it or not? And that's done in the app.  
**Joe Green:** Yeah. Yeah. Yeah. Cool. No, that's pretty clear. So yeah, the I mean the educator managers kind of scope is fairly tight like what their their processes need to be and what they need the actions they need to do.  
   
 

### 00:53:09

   
**Joe Green:** Um which which helps but yeah we'll uh we'll working on  
**Christopher Azrak:** The color the colorful part the colorful parts happen when there's changes or there's cancellations.  
**Joe Green:** that.  
**Christopher Azrak:** And that's there's there's an outline there's in the um in the share and shared share drive  
**Joe Green:** Yeah.  
**Christopher Azrak:** there's a folder called your hems your sorry your heart and there's an outline in there talking to an educator management system the manager event cancellation process which is a problem currently and that kind of outlines where if it's if it's not that perfect straight line process say like we had recently in New York was a snowstorm educator can't get out there or the retailer cancels the event because there's a snowstorm and they're like, "I don't want you being in here. I don't have any customers. I'm closing down or for whatever reason, say that educator gets in a car accident, can't make it to the event or or a day before gets sick,  
**Joe Green:** Yeah. Yeah.  
**Christopher Azrak:** can't make it to the event." So that cancellation process needs to be captured with all this where  
   
 

### 00:54:10

   
**Christopher Azrak:** there's a where the educator does not have the the power to cancel it, but we're capturing what's going on and at least it's communicated. The manager makes that that that end call. But then we're tagging that this this educator canceled which it's you know it's it's a things happen but it's it needs to be part of a scoring process with the educators.  
**Joe Green:** Yeah, at least you can track if it's be if it's a habit or whatever, right?  
**Christopher Azrak:** Exactly.  
**Joe Green:** If it's becoming too  
**Christopher Azrak:** And then the most important part is finding a new educator to fill in that because because just because they cancel doesn't mean we don't do the  
**Joe Green:** Yeah.  
**Christopher Azrak:** event. We still try to find some for the event.  
**Joe Green:** Yeah. Yeah. Yeah. Cool. Super clear. Yeah. We'll uh we'll work on that for the for the next iteration. Um  
**Ethan Brown:** Uh that that reminds me of a quick question. Uh Chris,  
**Joe Green:** cool  
**Ethan Brown:** uh do you want us to start moving forward with the your heart uh name?  
   
 

### 00:55:09

   
**Ethan Brown:** I mean, obviously going to be a working title, but I just didn't know how confident you were that that was going to end up being the final  
**Christopher Azrak:** I'm I am not and that's probably going to be the Keith the owner's decision because he's  
**Ethan Brown:** title.  
**Christopher Azrak:** partial to Hems. Um I'm going to make I'm going to make a notation for my notes with with my operations team about that or I might bring it up in leadership. I'll probably bring up the leadership.  
**Ethan Brown:** Okay. You know, things like  
**Christopher Azrak:** I'm I'm shaking my hand only because it's been a long time where where I don't have the power for  
**Ethan Brown:** this.  
**Christopher Azrak:** branding and things like that. It's not my my decision.  
**Ethan Brown:** Yeah. Things like this tend to be sticky. You know,  
**Christopher Azrak:** Um,  
**Ethan Brown:** if we if we start showing a wider group of stakeholders a name, any name, it sort of just increases the chance that name will stick. So, we don't we don't want to get that wrong with respect to your other stakeholders.  
   
 

### 00:56:04

   
**Christopher Azrak:** Oh, trust me, I know. And I was originally this the intent of this was creating a clone. So, they keep calling it the clone. I'm like, it's not a clone. This is not this is not a copy and paste. This is like groundup new. And I want to make sure you guys understand that. This is not a copy and paste at all. Um, I will I'm going to ping our CMO Stephanie and I'm going to bring her into this because it's really in her her I want to get them I want to get the branding and naming convention right and I want to get her involved in that and I I don't want it to be a an emotional decision by by the owner and even though it's not my decision in the end but I think that's the best way of handling it but that's a good question Ethan. Um, what can I do to to make this process easier for you guys? I mean, aside from I know getting into the nitty-gritty, like I can I can start granting you guys access to the AWS if you if you and I have some some profiles for some other developments where I can I can copy the the security for that.  
   
 

### 00:57:19

   
**Christopher Azrak:** You guys can have access and then give me any any um ideas. Do you want me to I guess the question is you want me to use your your Ambar emails as the identifiers for it?  
**Ethan Brown:** That works.  
**Joe Green:** Yeah, I think that'd be  
**Christopher Azrak:** Because I think at this point you need to get in to look at the data structure look look start looking at things.  
**Joe Green:** great.  
**Christopher Azrak:** We'll do the um I guess the other question is too is at what point do you need access to the the application?  
**Joe Green:** the the existing like my hems application.  
**Christopher Azrak:** Yes.  
**Joe Green:** I mean, it was going to be one of one of the things I was going to ask. I think this the sooner the better. We're getting to a point where it's it'll help close that loop of us just being able to get in there, investigate um particularly around like existing um functionality. Um, and we could, if it's easier just to add like one account to like a test environment, we can just like share the credentials around as well if that makes life a bit easier.  
   
 

### 00:58:18

   
**Joe Green:** Um, and the other thing I was going to ask about is potentially, and this this is probably like a little bit further down the line, but maybe we can start thinking about potential like stakeholders that we can start having some conversations with and and putting some  
**Christopher Azrak:** Yes.  
**Joe Green:** of these prototypes in front of.  
**Christopher Azrak:** Yes. I think that's going to be good because I'm Yes. Okay. Let me start making a list here. Um  
**Joe Green:** Cool. And yeah, it doesn't it doesn't have to be, you know, a big list or exhaustive particularly at this stage, but I think just if we can start to validate a few things and have a few uh a few conversations with some with some early, you know, uh who are going to be early users, that'll be really helpful.  
**Christopher Azrak:** So, yes, I'm going to bring it up. I bring it up to the rest of the leadership group because I don't want to open this up too wide. And in the conversations I had with our back office that the the people that utilize hems every single day they're I don't want the other thing too is we need to have a process in place where we're gathering feedback and we're not getting and and I I don't want them to be giving you direction because a lot of these these people they're good at what they're they're they're good at what they do but I don't want want to get lost in the weed with you guys on to like the details and how things are working.  
   
 

### 00:59:54

   
**Christopher Azrak:** You know,  
**Joe Green:** Yeah.  
**Christopher Azrak:** if it's if it's, oh, this should work like this,  
**Joe Green:** Yeah.  
**Christopher Azrak:** this should work like that. We're doing something new. I don't don't want to get caught up on the way things have  
**Joe Green:** Yeah. Yeah. Yeah. Yeah. For sure.  
**Christopher Azrak:** been.  
**Joe Green:** I mean, yeah. We're um we can definitely help with that. We, you know, change is always uh tricky and and people that have been doing things for like x amount of years are always like get get a bit shocked. But I think, you know, that's something we can help with as well, just extracting what like the most useful kind of nuggets of information are, like things that we need to make sure that the system does or things that they don't like about the existing system. So, they always bring up some um yeah, some  
**Christopher Azrak:** I'm going to say I'm going to say Leah and Larry are probably the best ones for us to start off  
   
 

### 01:00:32

   
**Joe Green:** useful  
**Christopher Azrak:** with. Um I know time is is the other problem too is like next week is going to be a wash with St. Patrick's Day here in the States and we're getting busy as it is. Um it still would be good to have a good touch point with them and I think at this point now now that we're kind of kind of moving on quick and quick quickly just to have that feedback and I can help set up set up the guard rails as to what we're seeing. to be honest like having the prototypes up already so soon it's it's it's kind of caught me by surprise or else I would have brought this up in my my call yesterday and said maybe maybe to start having having conversations sooner. So um okay I will have that conversation with Leah and Larry. Um  
**Joe Green:** Yeah. And I think like next week there's, you know, there's loads for us still to work on and and we think we want to get them a bit more like polished and refined, but I guess if we can just sort of tee them up um for maybe the following week or or the week after that,  
   
 

### 01:01:37

   
**Christopher Azrak:** Well, I I think I think Okay,  
**Joe Green:** that would be perfect.  
**Christopher Azrak:** that's fine. I'm good with that. I I think what you guys need to do is start the the the foundational framework like where I I want to call out is we need to look at the data and get get the way the data data is situated. I know from application standpoint like we don't want to go too far down the process and all this without having the foundation built. So that's my big thing. So I can give you access to at least the database so you can see how that's structured application. So here's the other thing too.  
**Joe Green:** Mhm.  
**Christopher Azrak:** I need to be cognizant of our current developer and I don't because because this needs to be a parallel for a while and I don't want to make him feel that that we're pulling the rug from him immediately. Um, I can give you my access to the app on the front end, but you guys still need access in the back end at some point.  
   
 

### 01:02:38

   
**Joe Green:** Yeah.  
**Luis Galeas:** to be fair.  
**Christopher Azrak:** Thank you.  
**Luis Galeas:** I mean I think so I think the front end will be very good for now in the sense that like the I think the schemas are not as helpful uh in the sense that like by intuition we can I mean engineers myself I I think we can kind of figure out what's behind the scenes. Uh obviously the data itself that's that's useful and at some point we we will need access to it.  
**Christopher Azrak:** Oh, that that that that I have I've got admin access to into our AWS.  
**Luis Galeas:** Um  
**Christopher Azrak:** So, granting access to the data is not going to be a problem.  
**Luis Galeas:** yeah so that that and at some point you know like the uh yes so if you have admin access to AWS you know there there will be a way for us to get uh read access as well with you will be able to do do that but I think yes for the front end at least uh in if I were to choose right now like just instinctively don't recommend you guys don't among the others uh but being able to navigate The current application is more valuable than looking at the database team as values.  
   
 

### 01:03:44

   
**Christopher Azrak:** So I think I can grant you guys my access. Just know it is live. So if we do this um if we So if we if we do this from a and I can I can give you my login credentials. I don't I don't mind doing doing that. So that way you guys can walk can can have access via my credentials. Just note, don't make any events and don't change anything because it will it will go in live and everything that's in there is live production. I know we don't have a like a demo. Actually, let me find out if there's a demo environment. I think there's a demo environment. If I if I can grant you access to the demo environment, that should be sufficient for you guys because that's Yes.  
**Joe Green:** Yeah, that would be idea, I  
**Christopher Azrak:** Yes.  
**Joe Green:** think.  
**Christopher Azrak:** Let me ping Leah here real quick. See if she's actually on Teams. I'm trying to get everyone on Team so like messages like this can just go out  
   
 

### 01:04:48

   
**Joe Green:** Yeah.  
**Christopher Azrak:** quickly.  
**Joe Green:** Yeah.  
**Christopher Azrak:** Um so I will ask about that. So I think that's the best and best course of action. I can get try to get you access to the demo. Um  
**Joe Green:** Yeah, that would um that would be great.  
**Christopher Azrak:** and  
**Joe Green:** I think if we get a live obviously we'll uh you know try not to delete any events or uh you know create anything but um demo environment would be ideal if we can set that  
**Christopher Azrak:** Okay. So, I'll do that when we get off this call here.  
**Joe Green:** up  
**Christopher Azrak:** I'll work on on getting you guys AWS access now. Um, I will upload my Vizio. I have share my screen here real quick. You're still We're still good on time, right? We have time till three.  
**Joe Green:** yeah still got 25  
**Christopher Azrak:** All right. So, let's do this.  
**Joe Green:** minutes.  
**Christopher Azrak:** You share some of the the physios. I'll move over here. Open.  
   
 

### 01:06:10

   
**Christopher Azrak:** Okay. So, you'll get a copy of this in our shared and it's it's not completed yet like this manager process.  
**Joe Green:** Perfect.  
**Christopher Azrak:** I'm still still working on the bigger one. So, there's crossbox. So what crossbox is is we created another it's supposed to be a database but it's not a database. It's but it's a dev structure where where a lot of the data is that we the whole point of it was to utilize it for um APIing and pushing over data to other other places. But what I've done is I've basically basically categorized a lot of the tables. Everything that's in pink is live and everything that's in green was where where we were going to for like a master data the master data and for for APIing. So if I go back if I zoom into here um these are the tables that currently exist for our supplier product items or the product items. So there's there's a table for product types, brands, products, sizes. what I have here. This is from a lot of the work that I've done and it's styled after after the way I've been doing.  
   
 

### 01:07:28

   
**Christopher Azrak:** So, there's the master key. There's an org. I really need to get this cleaned up now for you guys. organization, the brand, the product and product type, the the category, uh brand number, there's heart ID, a heart ID of some sort of identifier identifier that we would need. There's a distributor ID  
**Joe Green:** Mhm.  
**Christopher Azrak:** number. So essentially this this help wouldn't help because this it gives a lot more detail in terms of the product. It's probably overkill because there's some things in here like the size how how many pallets fit on a container like we don't need these things necessarily for us. Um but like short description and all that. So what I what this would this would be helpful for you guys if you start seeing these tables as to what they're connected with. I've at least grouped that so you can kind of see how all this works from a standpoint um assets and and where where those those are currently linked to account evaluations. So this was going to those that sheet of paper even though it's evaluation sounds like you're evaluating after the point but it's actually actually during and afterwards but what we're capturing um  
   
 

### 01:09:02

   
**Joe Green:** Mhm.  
**Christopher Azrak:** and educator profiles there is a lot of detail in the educators we currently capture  
**Joe Green:** Yeah.  
**Christopher Azrak:** in users the educator  
**Joe Green:** Interesting.  
**Christopher Azrak:** details because a lot of the payroll and payment payment process get gets pulled out of this as well. And there was an educator rating which we're not really utilizing yet. All that's definitely important important with that.  
**Joe Green:** Yeah.  
**Christopher Azrak:** There's we're not really leveraging all all this within the application currently. This would this will help you look at when you start seeing the tables and you start seeing the data what this is grouped of at least. And you guys have me to kind of help decipher this.  
**Joe Green:** Heat.  
**Christopher Azrak:** Um the other the other good diagram that's in here, this is just all the tables. There is a technical current. So I think I walked you guys through and through through this before,  
**Joe Green:** Yes.  
**Christopher Azrak:** correct?  
**Joe Green:** Yeah. Yeah, you did.  
**Christopher Azrak:** So you you have a copy of what what the current state of how it currently works.  
   
 

### 01:10:06

   
**Christopher Azrak:** um just to kind kind of get an idea as as to the flow and and what what  
**Joe Green:** Mhm.  
**Christopher Azrak:** happens and just knowing that these emails we have that email answering AI that we're instituting and this certain this survey tool is now something that we have that would be integrated in kind of what what you guys are already doing.  
**Joe Green:** Mhm.  
**Christopher Azrak:** Um, so and then the actual AIS. So this is the this is the certain the the email flow for the AI if you wanted to look at it with with the decision tree is built into it. Everything that's that green teal is the is the AI process and what it touches and what decisions is. I don't I think this is I don't want you guys to get too focused on this because we'll be testing and and and  
**Joe Green:** Mhm.  
**Christopher Azrak:** pushing the learnings on this. This is more of a phase two when we start and start figuring out more of the integrations and start looking  
**Joe Green:** Mhm.  
**Christopher Azrak:** at those things from a um so I I will get you guys the access you can you can see it.  
   
 

### 01:11:15

   
**Christopher Azrak:** I'm sure you're going to have more questions. And I think once you get access and you have more questions,  
**Joe Green:** Yeah.  
**Christopher Azrak:** I think the best route to take from there is to figure out then what what do we need to put more color on for you guys? And that could be a conversation with some of the other stakeholders. And from a technical aspect, I'm going I I want to be able to give you guys as many outlines and references as possible. Oh, and there is a manual that is in that that that current share drive as  
**Joe Green:** Yeah,  
**Christopher Azrak:** well.  
**Joe Green:** I've seen the it's in the manual that was really helpful to understand like the current current spec and current scope. Um, and yeah, I was going to say I completely agree on the like the data and architecture. we'll uh if you can share those bits, we'll have a review of those first and then maybe we have a separate session afterwards once we've kind of digested those. I'm sure we'll have bunch of questions and and things to talk through um once we've had a look through  
   
 

### 01:12:08

   
**Christopher Azrak:** Okay. And  
**Joe Green:** them.  
**Christopher Azrak:** do just for the sake of me because because AWS is not as intuitive to me as Azure is. Um do you want to do that setup now while I got you just to make sure that you guys are getting what you need?  
**Luis Galeas:** Well, I used to work there, so I can definitely tell you how it works.  
**Joe Green:** Yeah, that uh might be easier to go through  
**Luis Galeas:** Yeah. Yeah.  
**Joe Green:** now.  
**Christopher Azrak:** Okay. Um, currently in terms of resources there are some think there are there are some databases this prod here is the production and there is a demo and this this my hems is demo. The demo though is kind of gimped because it hasn't been updated since since two years. Actually, that's it creation date. My thinking here. Um, you probably still need to look at the production environments. The portal this SLS staging is is it's a separate process that that's processing some forms. Um but yeah if you if you uh I think think for this is the IMA correct for for accessing.  
   
 

### 01:13:38

   
**Luis Galeas:** That's correct. Yeah.  
**Christopher Azrak:** So I do have create a new group for you guys. Is that creating a group? User  
**Luis Galeas:** Uh it it it no it it does but uh you need to keep uh selecting things in the uh in the  
**Christopher Azrak:** group.  
**Luis Galeas:** screen.  
**Christopher Azrak:** Gotcha. Add users.  
**Luis Galeas:** Yeah.  
**Christopher Azrak:** Optional. Okay. Okay.  
**Luis Galeas:** Yeah.  
**Christopher Azrak:** Okay.  
**Luis Galeas:** Leave it there. Yes.  
**Christopher Azrak:** Policies to the group.  
**Luis Galeas:** Yep. And then um I think for now uh there's a there should be a read access. So that's uh yeah there's a lot of these. So if you uh I think it's called maybe type admin. Don't do the full admin, but there's uh there's like an admin read. Uh sorry,  
**Christopher Azrak:** No.  
**Luis Galeas:** just just type in admin and then let's see what comes up. Um uh or I think it's called read only maybe. Oh, okay. Yeah, it'll be sorry.  
   
 

### 01:15:11

   
**Luis Galeas:** It'll be very deep into the uh into the pages because there's like a general read. Let me find  
**Christopher Azrak:** Am I able am I able to copy another another user group's permissions  
**Luis Galeas:** out.  
**Christopher Azrak:** because I have another group that I already granted access is doing the AI  
**Luis Galeas:** Yeah. So,  
**Christopher Azrak:** stuff.  
**Luis Galeas:** actually if you go back to that group and we can just see what uh what permissions you gave it. So they will have uh Oh, I see. Uh no, these won't be used for  
**Christopher Azrak:** I didn't grant them like the full access because they don't need access to all the the the different data bases and data sets and I yeah so so it wasn't wasn't all  
**Luis Galeas:** Yeah. So, in fact,  
**Christopher Azrak:** those  
**Luis Galeas:** if anything, actually, now that I'm thinking about it, uh so, uh do you know where the databases are for this stuff? Uh are they RDS databases where or like are they ser are they server? I suppose if you if in search if you type in RDS  
   
 

### 01:16:14

   
**Christopher Azrak:** I was going to say I can I can tell you I think they're EC EC2s maybe. Um  
**Luis Galeas:** look at things a little bit. Uh but anyway, let's go uh yeah, actually let's go on EC2 and then let's see what machines are listed in there and then oh uh it be a long time. Oh, they might not be in a in the right region. Um, so if you Yeah. See, you see at the top right where it says United States, Ohio, you need to select Virginia, Northwest Virginia. So, USC uh top right and the black where just top right of the browser  
**Christopher Azrak:** Sorry. Sorry. One more  
**Luis Galeas:** almost top right of the browser.  
**Christopher Azrak:** time.  
**Luis Galeas:** Uh, yes, the left of that it says United States, Ohio. Click that and just go for North Virginia, they'll be in there because that's where the cost is coming from.  
**Christopher Azrak:** Oh, wow. Okay, that's a big difference.  
**Luis Galeas:** Yeah. Uh yeah. So, and then if you click instances here, you can see the name of those instances and see if the databases are running on EC2s.  
   
 

### 01:17:33

   
**Luis Galeas:** Uh that doesn't strike me as that strike me as a web server, not as a database. That's okay. Fair enough. Uh if you Yeah. So it might be that these are on uh So if at the top you click RD like you type in RDS in the search. Yep. And click the top one. Aurora RDS. And let's see what you got here. Yep. Yep. You have some of these. Um, so if you click DB instances,  
**Christopher Azrak:** DB instances you said.  
**Luis Galeas:** Yep. Yep.  
**Christopher Azrak:** Okay.  
**Luis Galeas:** Yeah. There we go. So, there's a corresponding database for each of these. So, okay. So, the good news and I've got bad news. The uh good news is that we know where the databases are. The bad news is that it's likely that even though you have administrator access, you actually cannot access these databases. um because the credentials for those databases are application level concerns.  
   
 

### 01:18:34

   
**Christopher Azrak:** Yeah.  
**Luis Galeas:** So AWS doesn't really manage those for you after you've set them at the beginning. Uh so they will be stored somewhere with the application and it would mean that the engineer that has access to uh or whoever has access to those credentials they need to create a user uh and enable us to access uh this uh now something you could do actually let let's actually double check. So if you click on the uh my hem staging. So let's see what kind of this community. Okay. Yeah, this is even uh harder because it's not the Aurora um version. Oh, you do have a um Oh, cool. You have a uh it's public and it's giving you the um let me just double check here. So, okay. See if it's giving report user. Oh, okay. Cool. Yeah. No, it doesn't give me the password anymore. I was uh I was a bit surprised here. I was like, they're displaying it um in the screen.  
   
 

### 01:19:42

   
**Luis Galeas:** Uh no, so there's a password here for accessing this database. Um this in getting the staging one would be better because then you know you know that it's a it's not a live environment. Um so this is what will be useful. uh the rest of it I mean there's not really much use at all. I mean even right now if you give us administrator access to the ITW account I wouldn't be able to uh get into the database without resetting the application itself which obviously I don't want to do. Um so anyway so yes so the bad news is that we we can't actually uh access this even with your admin access here. You would need to ask the developer to share those those details or create as a user specific or specifically  
**Christopher Azrak:** Okay. So maybe maybe this is the best way I could go about this. I've got a meeting with our developers actually in 10 minutes. Today's Wednesday, right? Or Tuesday? Today's Wednesday. So I I've got a meeting with the developer in 10 minutes.  
   
 

### 01:20:41

   
**Luis Galeas:** Wednesday.  
**Christopher Azrak:** Um that's our our usual usual weekly meeting if you guys want to give me specifically what we need to get granted if you and and how and how so I can then communicate.  
**Luis Galeas:** I'll bring that on Slack right now.  
**Christopher Azrak:** Okay, that'll be helpful.  
**Luis Galeas:** Yeah. Um  
**Christopher Azrak:** I'm glad we we spent this time to do this because this would have wasted a day or so with me granting you guys access and you wouldn't be able to do  
**Luis Galeas:** Yeah.  
**Christopher Azrak:** anything.  
**Joe Green:** for sure.  
**Luis Galeas:** Uh, cool.  
**Joe Green:** Awesome.  
**Luis Galeas:** So, what I'm going to do, by the way, just to give you a heads up. So, what I'm going to do is I'm going to ask that they create you an administrator user on uh on that on that staging account. uh in that they confirm that you can access it yourself from a client in your machine such that next time that we meet uh I can give you very quick instructions uh together so that you can give us then read access to the database by creating users for us that way instead of having to do three steps with them and then it possibly going wrong we just need to get one thing right which is giving you admin access to that database  
   
 

### 01:21:56

   
**Christopher Azrak:** Okay, that worked. Cool. Well, that was that I think that that was the most productive part of this meeting. Aside from you guys showing me showing me what you guys had had done already,  
**Joe Green:** Yeah.  
**Christopher Azrak:** but  
**Joe Green:** Yeah. Awesome. We're pretty much at um pretty much at time. Um, and I think we've covered a lot and there's some really really good feedback. Um, and really helpful. So, I think we can we can wrap up now. We'll obviously take away uh some of the points you've made. Continue developing the bits we've shown you and some of the gaps as well. Um, and if we need anything else from on the database side or if you have any uh questions on the back end side and we can may have a separate session maybe to go through those once we've dug in.  
**Christopher Azrak:** And I would say this too, I I've been debating I think the last thing that to mention that where I could be helpful with you guys, the current flow is here and the current application flow is of value.  
   
 

### 01:22:55

   
**Christopher Azrak:** But with the new direction that you guys are giving,  
**Joe Green:** Mhm.  
**Christopher Azrak:** I think it'll be good for us to start wireframing out what this new flow for for the app looks like so that we can start adding in color because what I want to do is I want to be able to add in like the detail for you guys and outlines and start capturing that so you have some something to refer to. So I think the that's the other thing too at some point if we can kind of start mapping it out together that way I can start providing the color and the details around some of the the areas and processes as well because just showing from what you guys the prototype it confirm like me wireframing out what I think I don't want to hinder you guys in some of the some of the value you guys are bringing to it. So I think if we start talking about that together and I can add color to it, I think that that's a way that can help support a lot of the details, help us move faster with more detail.  
**Joe Green:** Mhm. Yeah, that'd be super helpful. Um, we've got we've got another call on Friday um in the diary. So, I think we can we'll obviously try and make some progress uh between now and Friday and then we can uh maybe use that session to to yeah have a bit more of a collaborative session to go through uh yeah, where we're at.  
   
 

### Transcription ended after 01:24:36

*This editable transcript was computer generated and might contain errors. People can also change the text after it was created.*
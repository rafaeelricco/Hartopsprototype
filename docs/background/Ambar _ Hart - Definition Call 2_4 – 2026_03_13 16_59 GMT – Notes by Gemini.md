Mar 13, 2026

## Ambar / Hart \- Definition Call 2/4 \- Transcript

### 00:00:00

   
**Joe Green:** So yeah, there's um we had a discussion to go through again some of the uh as we start getting into like looking at the data architecture and particularly around like the master um item and and brand structures. And we just had a few just wanted to play back essentially what how we currently understand it. Um what our sort of current working assumption is for for V1. to what we'll move towards. Uh and then within there there's some some questions and stuff just to make sure we like fully understand how  
**Chris:** Okay.  
**Joe Green:** things um you know how you would like things to be set up both for like the short term but also for the long term like vision as well to make sure we're um you know we're not creating any problems for ourselves in the in the early stages for the for the latter.  
**Chris:** Okay.  
**Joe Green:** Um and then also uh we've got some um design updates as well which Raphael will go through um to the prototypes and some of the feedback you you shared on um Tuesday I think um Wednesday um just to play that back to you um as well uh and get any more thoughts um to to continue refining those uh uh next week as well.  
   
 

### 00:01:22

   
**Joe Green:** Um so yeah um I'm not sure if uh if Lewis is joining.  
**Chris:** Okay.  
**Joe Green:** He might be running a little bit late. Um but we can uh we can get started. Um I  
**Chris:** Did Did you guys see the My SQL um login information on  
**Joe Green:** think  
**Chris:** Slack?  
**Joe Green:** Yes. Yeah. Yeah. Um yeah, got into the into the platform, started having a quick um uh yeah, dig around there um uh yesterday. Haven't quite got, you know, as much into it as I'd like to, but it's uh we've got access, so that's all good. We can we can get stuck in there. Um, and I believe Ethan has been starting to review some of the other um,  
**Chris:** Okay,  
**Joe Green:** uh, like assets and files you've added to the um, SharePoint uh, folder as well. So,  
**Chris:** cool.  
**Joe Green:** all super helpful. All right. Um, let me quickly uh, share my screen. It's probably the easiest way um, just to go through uh, make sure we're looking at the same stuff.  
   
 

### 00:02:24

   
**Joe Green:** is Sarah in Slack. Hopefully you guys can see that quickly. Um but what um just going to play back as I say to start with what like our current understanding make sure that we've kind of fully understood how you've uh you described it the the other day and particularly focusing on the uh item and account masters. So um yeah as we understand it uh you currently have or at least are building towards a master set of brands and products can be used across clients. Each trial client um will manage multiple brand and each brand will have multiple products under it. So for example Smyrnoff number classic vodka etc. Uh then campaign and events in the platform will reference those products. Um so within a campaign it might be promoting for Smyrnoff in a specific product so 21 classic vodka and then those events will ultimately then again be tied back to those products uh as they live within a campaign as well. Um is that correct?  
**Chris:** somewhat. Um, I was working on a visual and I would have gotten this out to you guys earlier if I hadn't got knocked up up the side of the head  
   
 

### 00:03:28

   
**Joe Green:** Okay,  
**Chris:** yesterday being sick.  
**Joe Green:** we're good.  
**Chris:** I was trying to do do a hierarchy visual so you guys could could see this and visually I think this will communicate a little bit better. Let's see if I have this.  
**Joe Green:** Mhm.  
**Chris:** Yes. Um, so I will share my screen here and I apologize it's not completed. So, so ignore some of some of the stuff that's on here, but I will.  
**Joe Green:** Mhm.  
**Chris:** So, the item the some of the those assumptions are correct on the campaign. What we want to do is we want to have a um a grouping hierarchy for for the current engagements and what that looks like. So what you have in terms of item and like this is a distributor and distri distributor setup which also would be very similar to a single supplier hierarchy and forms of what their data looks like. So I wanted to share that organization would be like Dagio. Um supplier would also be like brand. So we could say this would be like Smeirnoff um and and so forth. I know this brand down here but this would sorry back up a second distributor.  
   
 

### 00:04:49

   
**Chris:** So the organization would be the distributorship. So this could be Southern Glazers. Supplier would be Dagio. They have markets like a geography that that they execute which would align with our our geography and our markets. Um there's the four channel groupings which align with our four channel groupings. And there's a chain categorization where it would be like the Tesco's, what counts as Tesco, what counts as TJI Fridays. Um, that's just extra information in terms of how the accounts are grouped because essentially there are types of accounts, but they're grouping of accounts. And then item the item master brand line item. So the supplier starting off like you have would be be Dagio. The brand would be Smeirnoff. The line would be like Smeirnoff number 21 and item could be Smeirnoff number 21 175 and five five liter bottles. So what you have is good. The only thing I would I would challenge with is under us what we have is the campaign structure and this is I didn't fully complete here to take a look at. So a campaign would be encompassing of a single organization or supplier and the this hierarchy would be tagged within that as to know for the campaign uh what supplier what state because we right now we're just in the northeast area but we want to make sure that this expands nationally.  
   
 

### 00:06:21

   
**Joe Green:** Mhm.  
**Chris:** Um so the so we would we would select the geography select the channels possibly se select the accounts but really the accounts are assigned at the um activities like activities level. So if we can if you think about the the campaign hierarchy it would be like the campaign selecting all all from all all the master tables to to create and create the campaign universally. So that's like like the box that's created plus it's overarching it has a single budget then all the activities in in between that are like the events that occur.  
**Joe Green:** Mhm.  
**Chris:** So as we start to start doing that and doing that the events would roll into that and then the events would would be selections off the accounts the brand item and line would already be pre-selected from that but it might differ for the types of activities. So we might do say Smeirnoff flavors events and do that separate from like say Smeirnoff classic events or because DIO has such a breath of of different portfolios. Sometimes they would do one single brand and sometimes they would do a portfolio of brands where they might do tequila with vodka with rum all together.  
   
 

### 00:07:33

   
**Chris:** Um so that's why it's good to have like the whole campaign because the whole campaign would be this is what we're going to be doing ongoing. have the activities templated out so that when the requests come in from from the distributor or a supplier to execute these we can  
**Joe Green:** Cool.  
**Chris:** then say okay it's this campaign these are the activities templated out I just need to assign the account and assign the getting the um educators and managers to that actual event to be executed  
**Joe Green:** Yeah, mostly clear. Two questions for me. I think I know the answers, but just to double check. So, like what would an example of a channel and account be?  
**Chris:** So these are connected.  
**Joe Green:** I assume like account is like  
**Chris:** Um so from a from a hierarchy from a higher standpoint channel is broken up four ways.  
**Joe Green:** Yeah.  
**Chris:** You have on premise chain.  
**Joe Green:** On premise, off premise. Yeah.  
**Chris:** Yes. So the the account would be locked to what that channel is. When it's just when you're doing a campaign, the budgets a lot of times go to the channels to be executed.  
   
 

### 00:08:40

   
**Chris:** So they may they may not come to us a lot of times with an account list as to because they have to go to the retailer get the permission and sell it into the account. So what they will say is from a campaign standpoint and activity standpoint we're going to do that smearoff classic in the on-remise like this and template that out and we're going to do smear classic in the off-remise like this and template that out. So the channel is important just just for the sake of the type of of of execution it'll be and that ties into the the the way that we would go about executing it. So when we're in the account like we we talked about this last time, we wouldn't necessarily set up like a a sampling table in the on- premise. Our people would go around with with pre before drinks and offer offer drinks to people. Whereas in the off- premise, you'd have a table set up, invite people to come to you and give them experience of sampling at at the table.  
**Joe Green:** Yeah. Okay, cool. I think that makes sense.  
   
 

### 00:09:42

   
**Joe Green:** Any questions uh Ethan or or Raphael before we uh before we  
**Ethan Brown:** No, that all makes sense so far.  
**Joe Green:** proceed  
**Chris:** I I'm I'll continue cleaning this up for you guys so you have like the hierarchy because I think this would be helpful from a data standpoint and this is the sort of stuff that I'm very close to. So I feel like this would be easier from a discovery standpoint and figuring this out. Um, plus this hierarchy is what I use for Coopercast on my own company. And this is the hierarchy that we see that the distributors use, that the um that the suppliers use. So, this also allows us to allows us to then then do some more lineups. There's keys that go into this that can highlight in here like the distributor will have starting to put in here. They'll have identifiers for for the organizers. you have identifiers for the items and identifiers for the counts. But so those are really the main ones and you can derive geography and channel from the account that's executed as well. But it's just good to know that that's all interconnected so that we're think about this from a reporting standpoint.  
   
 

### 00:10:55

   
**Chris:** We'd like to and especially what you guys are proposing. We liked if you're starting off building a campaign in the optimism, then the data knows, okay, this is what your expectations should be for the market because we know what the channel looks like in this market and the time of year and and and what what um success what success what successful brands have done in the past. And so that all all ties into to the the intelligence of of of the platform and you start looking at at that that portion.  
**Joe Green:** Yeah. Yeah, that makes uh makes sense to me. All  
**Ethan Brown:** Um so I I have a couple of questions um related to this.  
**Joe Green:** right.  
**Chris:** Sure.  
**Ethan Brown:** So my understanding is that heart is essentially maintains a comprehensive database of uh product lines and items.  
**Chris:** Right.  
**Ethan Brown:** Um is this something that you develops itself or are you getting this from some you know centralized source of industry product information?  
**Chris:** So we we have been looking at um industry source. There's a company called VIP that can provide us an item master.  
   
 

### 00:12:12

   
**Chris:** The problem being is looking at their contract is it's very loose and if we wanted to resell this data and it's tied to tied to their their data,  
**Ethan Brown:** Sure.  
**Chris:** they may have some objections to that. So there's there's some usage issues. Internally it's fine. and for usages for our normal business, it's fine. Just from a future standpoint, it might hinder us from doing this. The the good news is um when we interact with a supplier, they usually give us their item items. So then it's it's a process of manually putting it in. The current Hems platform allows us to go in there because we have that item master already.  
**Ethan Brown:** All  
**Chris:** There are some duplications in there. it needs to be cleaned up. But if there's something new in there, we go in there like there's always something new that's that's categorized as innovation. And a lot of times that's what they spend a lot of these events on is to get it out there and get people to know it's new.  
**Ethan Brown:** right.  
**Chris:** So those one-offs here and there we'll add in and add in the detail and it'll be part of the item master.  
   
 

### 00:13:15

   
**Chris:** So we maintain it ourselves.  
**Ethan Brown:** Okay. to follow uh sorry uh  
**Chris:** Go ahead. Go ahead.  
**Ethan Brown:** followup question um in in the future when your heart for lack of a better better name for the product your heart is uh functional and you have new clients come in you have a new client come in they start a campaign they you know choose a a product that doesn't exist in or you know they um they're promoting product that doesn't currently exist in the our database. How does that flow  
**Chris:** So, there is a and you'll see it in the demo under management.  
**Ethan Brown:** work?  
**Chris:** Um, if I can pull it up here real quick, but there is a um um there is a a page where an item can be added into item master. Very fairly simple. So, all it requires is just going in there adding it. It's immediately part and part of the the database and it's available for the rest of the platform.  
**Ethan Brown:** Uh, and is that now part of the heart database? So, you know, client A comes in and they add this new product and then it'll be available to client B  
   
 

### 00:14:24

   
**Chris:** Yes. And this is where from a from a data standpoint,  
**Ethan Brown:** then  
**Chris:** if we were to for for the for the example that we're working on, if this is going to be something that we we allow another client into, then if we're able to API to their item master, if they're they're well organized, then that would be something that they we put together an API as part of the poll in terms of some things that they get. Um, otherwise it's it could be just manually added in. And this is where I'm thinking this becomes part of what our data is. Yes, it's the client's items, but it's good for us to have this um and start building it up. So, we would have a copy of that item master in in the the great and greater structure.  
**Ethan Brown:** All  
**Chris:** So, they would have access they would have access to all the items they're putting in, but we would have a copy of what items that they're putting in as well. on the account side.  
**Ethan Brown:** right.  
**Chris:** So the the good news is in the state of New York and some states they do post all the accounts that have a a alcohol license.  
   
 

### 00:15:26

   
**Chris:** So getting this list of of accounts is fairly easy. And we do have relationships with distributors, which distributors maintain that because from a legality standpoint, if they were to sell to an account that is in is in um poor standings with their license, they could get fined an exorbitant amount of money. So they manage that on a daily basis as to who is in good standings, who's not in good standings, and who owns the these licenses. uh we do get a manual feed from them. Um it is part of my road map down the way to API directly from them because one of our clients are distributors. So having their their universe that's why I was having this under distributor their accounts have their own unique tagging and for billing purposes we will include that that unique tag for what what account we actually executed in but they do provide us currently in a in a flat file all the accounts in in the markets that we service them with.  
**Ethan Brown:** Okay. Um, so, so last question, and this is sort of more future functionality.  
   
 

### 00:16:35

   
**Ethan Brown:** Uh, given, given what you just said, there's probably going to be a need for some sort of, um, review or reconciliation process for HART. You know, as clients come in, they're adding products that don't currently exist in the heart database. heart will probably want to have some sort of process where they can be like, "Oh, you know, these three clients, they have these five new products. Do you want, you know, review them, check the data quality, check the schema quality? Do we want to incorporate this rate this into the hard database, etc.  
**Chris:** So what I'm thinking um we have three different flavors of the future builds. We have the core, the SAS and affiliate and underneath the core that's the internal for us. By all means we would be adding in whatever items we need for ourselves to keep running the business as status quo. for the SAS, they would just be adding it into their organization or their supplier. So they they wouldn't have access to the greater database and on the affiliate my vision is they would not have that ability to add in new items like because we're basically the the affiliate difference between the SAS is that  
   
 

### 00:17:17

   
**Joe Green:** Yeah,  
**Chris:** they are how to put this um they technically work for us as an event company in another state. So say like Minnesota and say there's a company in Minnesota that's that's in Minneapolis and they they're doing events for one of our clients we're supposed to say stole. So we give them access to the affiliate version. So now they can conduct business as if they're us. We capture everything in our format to the detail that we need. They get the bill billing and they get they get the the the opportunity to work with stolie but they handle the billing. They handle all that stuff. they just have have the platform. So adding in items and changing the configurations is out of scope for them. They would just get and get the the heart and hardcoded encoded version and it it would be like a a version where where they would just have the access essentially and be able to add data into it but not be able to change any of the core foundational data.  
**Ethan Brown:** Okay, thank  
**Chris:** um when we start thinking about these things and I was thinking about this in between while I was laying at bed yesterday and I was looking  
   
 

### 00:18:52

   
**Ethan Brown:** you.  
**Chris:** over the outline um the original outline I shared with you guys which is in in the share drive uh I'm not sure if you can see my can you can you uh am I sharing my screen?  
**Joe Green:** we can still see.  
**Chris:** Yeah, I'm sharing my screen.  
**Joe Green:** Yeah. Yeah. Yeah.  
**Chris:** So when we when we think about the future builds and this was the original overview I sent back in January which I know Lewis and I were going back and forth. I know you guys have put your own flavor on, but I think this is a good way of thinking of of the future build in terms of where we want to go where the the big over encompassing functions is the core which is us and us us replacing the current mys with the same capabilities we have the SAS being the one that you guys are building on for today which is that that one for that we're going to use for stolie and the affiliate and then what would be phase two and four as we get go down the route towards data syndication is that that data web portal where now there's more more access on the insights and and other things that we're driving to to resell resell data and be that that that institute and focus around syndicated data but that I think we don't have to necessarily think about today because everything we're doing for the other three versions we're collecting the data from so everything we're talking about here from a foundation standpoint  
   
 

### 00:20:24

   
**Chris:** That's that's why I want to get these hierarchies as deep as possible now so we don't have to go back in and build it in later on when we need to start slicing and dicing the information for syndicated data.  
**Joe Green:** Cool. That's all that's all clear. I think so there's for the SAS and affiliate models there isn't like a world where they would be complete like w gardens and like the data would not feed back to like the core platform in any way.  
**Chris:** that that's my vision because that's the way pinata works. um that would be some of the way that I would want us envision doing the contracts where  
**Joe Green:** Yeah,  
**Chris:** the data data would be a part of it and and they would still be able to do things with their data  
**Joe Green:** I am.  
**Chris:** and part of part of the reciprocal value I'm thinking is that we could still offer them these insights back to them to the people that are associated with us with the affiliates essentially what essentially it's like a I'm not going to say premium version but it's it's kind of like a premium version where they would get access to all the capabilities Please, we would get a cut.  
   
 

### 00:21:29

   
**Chris:** So, you understand like like like the business model, we would they would utilize the platform. They would pay us uh for the events. So, we would get like a a cut of the revenue from the events and they would get access to the software. So, to me and my mind and if we're giving them access to the software and doing it just for the cut, this is a way for us to recoup some of our expenses by getting access to the data and the results.  
**Joe Green:** Yeah, that's clear. And so for the like within the core experience uh on an for the item master at an item level if you've say got smiroff number 21 classic vodka you would want to see in there like which client sorry if I'm getting the semantics wrong but you know like this has been used on like XY Z like SAS agreement so you can see this product is being used across this many platforms and presumably some then  
**Chris:** Correct. Correct.  
**Joe Green:** you Uh deeper data on that as  
**Chris:** Correct.  
**Joe Green:** well.  
**Chris:** So that if we were to start booking for for us booking events or even for us for to roll up as well there there's a possibility that when when we launch the affiliate program fully and we give them a copy of this the the suppliers that we're working with that are our clients.  
   
 

### 00:22:49

   
**Chris:** So supplier and client would be the same. I'll give you an example because it's it's a real example.  
**Joe Green:** Mhm.  
**Chris:** Say say print over card. They want to expand with us. So within the core and we'll probably have to figure this out maybe assigning the uh the campaigns would start from us from a core sense not necessarily have them do it themselves and then the item master and all that would originate from the core and be man managed from from the core. So the affiliate would would still be it be more of a of a view view that securitized where that one individual company would only have access to their their environment and not the entire core.  
**Joe Green:** Mhm. Cool. Um and I guess on a related point, I think uh Ethan touched on this a little bit earlier, but if there are um you know differences between the same, let's say like as a working example, right? someone enters uh number 21 Smirnoff classic vodka and someone else calls it Smirnoff classic vodka number 21\. Is it like critical would you say at V1 that the system would need to like identify and match those up uh immediately or is a kind of workaround potential that there is like a a workflow built in where Hart's able to retrospectively match things up and review things?  
   
 

### 00:24:15

   
**Joe Green:** um like it's obviously possible to do it early. We're just trying to gauge like what's what you'd say is like absolutely critical for this initial Imagine.  
**Chris:** So um when you look at the current tab in table what's in there is is sufficient what I'm trying to get to go into the um the data table in here data hierarchy crossbox box data tables. I believe I could put in a copy of my item master in here. Item master. So, this is like a much more complete uh list of of all the different things that that would be in here. And some of these some of these are are not necessarily necessary for what we're doing. So if you look underneath products, the current state is sufficient for what we need because essentially what a lot of times what happens is just having the the product name and the naming convention around that is fine. There's usually a long view in naming conventions where it would be smearba 80 number 21 1.75. That's sufficient enough for us us to to do what we need to do.  
   
 

### 00:25:30

   
**Chris:** the the keys around that would be the distributor ID,  
**Joe Green:** Okay.  
**Chris:** the supplier ID and our individual ID because in in a proper item master for commercial operations in for a supplier, you'd have more involved in that that tie into more things like a federal ID number for tax purposes. Um there's other other things that could tied into that. We don't need all that stuff. All we really need need need need is necessarily the the right right naming convention and in the product universe in our industry there is no universal identifier for for items. It just depends on the syndicated data what what you're utilizing for that. Um there are ways of getting other universal keys like VIP has a key item item identifi identifier supplier has item identifier and distributors have an item identifier. So going back to the the data portal, I think it really just comes down to when we start designing that, who are we selling this into what are their uses? Like if it is a supplier and they're using VIP, then we could supply the VIP number to that.  
   
 

### 00:26:41

   
**Chris:** And if it's back to the distributor, we need to speak their language. So it be their item item ID. And then us going to that data institute, we'd create our own ident identification. And so that would be like the new universal of that. So we can  
**Joe Green:** Mhm.  
**Chris:** identify  
**Joe Green:** All right. Um, awesome. I mean, this is this is super super helpful. Uh, has anyone got any other questions? I was just looking through the the list I prepared before. I think we've covered everything kind of organically and obviously asked a few. Any other questions before we wrap up? Just want to make sure Raphael's got a time to show through his  
**Chris:** if you need to go over time. I'm not not a not at a hard stop. I always give you guys time around.  
**Joe Green:** updates.  
**Chris:** So, if we need to go over for additional questions, I'm good with that. Just to let you know.  
**Joe Green:** Cool. Yeah, I think uh I think we're good for me.  
   
 

### 00:27:29

   
**Joe Green:** I think um unless Raphael or Ethan you have any others around like data stuff, I think we can uh Awesome.  
**Ethan Brown:** I've I've got what I need for now.  
**Joe Green:** Yeah, I'm sure we will have more um as we go as we get more into it, but for now that's uh super helpful.  
**Luis Galeas:** Uh one housekeeping item I uh during the call I tried to connect to the database.  
**Joe Green:** Luis  
**Luis Galeas:** I think it's not publicly exposed. Uh and it's a staging environment so I thought maybe it was uh but just noting that down. We don't need to solve it now. Um but just a heads up. But the applica on the application you guys got access right as in like  
**Chris:** CH.  
**Luis Galeas:** ambar. Yep. Cool.  
**Joe Green:** What was that?  
**Luis Galeas:** Yeah.  
**Joe Green:** Sorry,  
**Luis Galeas:** On the application itself.  
**Joe Green:** I think my internet's dying.  
**Luis Galeas:** So there were two things where we were trying to get access right.  
**Joe Green:** Yeah,  
**Luis Galeas:** So that the data Yeah.  
   
 

### 00:28:23

   
**Joe Green:** the the app we have I have access to.  
**Luis Galeas:** Okay.  
**Joe Green:** Yeah.  
**Luis Galeas:** Cool. So on the database uh it's not public.  
**Joe Green:** Yep.  
**Luis Galeas:** So you ne you can't access it and I can't access it either even though they've given you the credentials. Uh so um yeah so you might want to let them know um because in the in the message that I wrote it was like okay you know it needs to be such that not only get the credentials but also that you can access it from your own laptop and I know because I checked the connection is just close to the outside world and in production this is what you want to do but in staging you know it should be fine for you to log into it.  
**Chris:** Okay. So what I and I I have a couple of developers. So one of the developers that was doing the app created this. The main developers did not create this. So there's two course of actions here. I can go back to the the previous which is team I'm still working with on other things to have them change and change that.  
   
 

### 00:29:17

   
**Chris:** if you could give me give me the instructions or I can I can share the instructions back with them because they would what was discovered was that not the main team but my other team had created the access. So the main hems developer the route of action is they can they don't have because they don't have access they can wipe it and start from scratch which I don't necessarily want to do because I still have one last project with them to move over.  
**Luis Galeas:** Yeah,  
**Chris:** Um so if there's specific instructions I can give my other team on what to do.  
**Luis Galeas:** actually,  
**Chris:** I can do that.  
**Luis Galeas:** you know what? Uh, and for the others, don't feel feel free. You don't have to stay if you don't want to. Uh, but like actually Chris, there's one other thing we could do. So, last time when we were talking about the AWS access, I said not to give us access because it didn't matter. Uh, because we needed database access. But actually, now that I think about it, the combination of this plus having AWS access would let me give ourselves access.  
   
 

### 00:30:16

   
**Luis Galeas:** So maybe we do that. Uh but yeah,  
**Chris:** Okay.  
**Luis Galeas:** guys, uh this will just be me and Chris going over a so don't let me take over the rest of your uh  
**Joe Green:** Well,  
**Luis Galeas:** day.  
**Joe Green:** we we're going to play back or do a quick demo update of the um educator app. So, maybe we run through that quickly first and then you guys stay on at the  
**Luis Galeas:** Okay, cool. Yeah. Yeah. Yeah. Go ahead. Yeah. Yeah. Go ahead.  
**Joe Green:** end.  
**Luis Galeas:** Do that.  
**Joe Green:** Awesome.  
**Luis Galeas:** I'll do that at the end.  
**Joe Green:** I I don't think it'll take too long.  
**Chris:** Sure.  
**Joe Green:** It's just a quick uh quick update on on some of the stuff we've worked on. So, cool. All right, Raphael, if it's uh if all good um then yeah, we go through some of those updates.  
**Rafael Ricco:** Yep. Let's see. So, okay, here we go. So, okay.  
   
 

### 00:31:05

   
**Rafael Ricco:** Uh, from our last meeting, um, I did a few updates. The first is the availability section that includes a calendar. Um the educator could could select if they is available all day available or unavailable and yeah that is  
**Chris:** Okay.  
**Rafael Ricco:** one of this updates I did and um the refinement we will I will do uh in this section as a suggestion from Joe is uh has a a way to to select blocks of uh of time off or time available But um that's it. That's a update I did for now. So So okay. So let's go to the event. Okay. Also here um I have added the session for brand guide. That's a a section the the educator could explore documentations and other stuff because I remember you have mentioned that something they uh print out from a PDF and that's a that is a way I find I found to put here for the check out and they could check the documentation and other materials.  
**Chris:** in that portion um you in and it should be I'm double checking it now and make sure it's in here.  
   
 

### 00:32:35

   
**Chris:** There's a folder and it's very confusing, but there's a folder called evaluation that that refers to all the brand information and event information. I'm just searching to see if I if I shared it with you guys because I I was moving everything over, but you can just take note of that. The evaluation form that that's currently in hems is it will have like the instructions how to to do and do the event. I don't want to keep calling the evaluation because it's confusing as all heck, but I'm just letting you know that that that'd be a good guide for you for for this portion as well.  
**Rafael Ricco:** Okay.  
**Chris:** And yes, it is in that that drive,  
**Rafael Ricco:** So,  
**Chris:** I think. Yes, there there is a um this is okay. Never mind. Um, so there's there's an example of a form in in the shared folder that's called heart platform, sorry, evaluation, heart event, and it's it's the output of what what it would would be looked like when it's been digitally clean, digitally filled in. But a lot of this stuff is already in is would would be included on the samples as as part of the information just to share with you.  
   
 

### 00:34:07

   
**Chris:** And you'll see as well when you're in the the demo um under the events in the notes section, a lot of the information is being captured in there. So we can get an idea with that. Just letting you know. But this is cool. All right.  
**Rafael Ricco:** Okay.  
**Chris:** Don't do don't want to don't want to like like like stop you. Go ahead. Sorry.  
**Rafael Ricco:** No, no worries. So, okay. I also did a few updates here in the sales tracking. Now it's just they will receive uh a list of items from from the platform and the the educator will just increase or decrease the the count of the each item and just save it and um that's update one of those update I did and yeah the vendor survey is the biggest update I did is now here they will take picture that could be any kind of picture and they just save and they could save and review later or review after take the the photos or or even add more photos. So for example, if they click the save and re review later that the ven survey will be pending a pending reveal and they could uh reveal the items and see all all pictures and adjust a lot of details here, add notes, add more products, a lot of stuff and everything that the the educator needs to do is take the picture and they could review later And um I  
   
 

### 00:35:47

   
**Chris:** I'm I'm laughing because where we're at with the MVP survey tool is the  
**Rafael Ricco:** think  
**Chris:** UI function and the UI sucks. And in a matter of days, you guys have put together a better UI than they have in three months.  
**Joe Green:** Let's get  
**Rafael Ricco:** okay that's a good feedback really good to hear.  
**Joe Green:** there.  
**Rafael Ricco:** So yes that's uh that is that is the major updates I I did also the branded guide here here that in the platform they could add a few documents notes and etc things that the the educator manager or uh related with the the campaign to be displayed for the the user and the user uh educator could could read and get get more context. they they don't they actually don't don't need to print something uh from a PDF and okay everything will be included inside the app that's a idea so um and that's it so uh the the customer  
**Chris:** Okay.  
**Rafael Ricco:** profile still the same and yeah that that's a major epig updates I did here so um yeah that's that's  
**Chris:** Okay, cool.  
   
 

### 00:37:07

   
**Chris:** I think I think this is a good good foundation to start from. Like it's I think it it's it definitely resonates and it and it meets the current needs. So from like a a first crack, I think this is really  
**Rafael Ricco:** Okay, thank you. Cool.  
**Chris:** good.  
**Rafael Ricco:** That's really good to hear. So, let me stop sharing.  
**Joe Green:** Okay.  
**Rafael Ricco:** That's it for my site.  
**Joe Green:** Awesome.  
**Chris:** But before I let you guys go and and Lewis, if you don't mind staying on, there's something else I want to talk to you about. Um, I know you guys are still doing your digestion and I I posted a few outlines like for the account profiles and some some of the goals for that. Thinking about it since our last conversation, I know there's a lot of deep detail and this is and there's there's a lot of existing things with the application. How can I make your lives easier? Because one of the things I want to get to I know we kind of laid out a lot of the the initial capabilities and things that we're going to do and now through this discovery we're kind of firming that up as to what what what those definitions are.  
   
 

### 00:38:13

   
**Chris:** Um what can I do? I was thinking about about like maybe building this out like an Azure DevOps where we're building out like a a project map of all the capabilities which could be translated over into also the the a product product manual and product white sheet of all the capabilities. I I'm wondering and it doesn't have to be today because I know we're still like that discovery and you guys are getting your head wrapped around the flow and getting access to things. I'm open to to a way where we can formalize this where we're capturing all these details, keeping it organized as there's a lot here and also so I can have something I can go back to leadership and saying this is what we're doing and this is where we are from an expectation from from release and this this current current release over the next eight weeks just so I can give those updates and I can have things to show and and show them that this is a a huge worthwhile investment that we're doing.  
**Joe Green:** Yeah. So, it's okay.  
**Luis Galeas:** No, I was gonna You go  
   
 

### 00:39:17

   
**Joe Green:** We're probably about to say the same thing, but um I was Oh, I was just going to clarify like um you know, we've got a few things that we we do as part of our process that sound quite similar, but I guess just to be clear, a lot you're looking to understand is essentially like, you know, beyond the original brief or the spec or whatever, it's like if we're talking about the educator app, like these are things we're going to build. These are loosely how they're going to work. These are things that maybe we're not going to build. Is that right? Essentially, that's what you're trying to understand a little bit more  
**Chris:** essentially that because we there's a lot of things and the the the current application is  
**Joe Green:** about.  
**Chris:** is large as it is. It's simple but there's a lot a lot of capabilities built into that.  
**Joe Green:** Mhm.  
**Chris:** I'm I'm not as worried about necessarily taking that and replicating because you guys have access to that. So seeing it and seeing see and capturing the flows and all that make sure those are there.  
   
 

### 00:40:10

   
**Chris:** It's connecting in like like we were you mentioned like the educator educator management the cancellation how the new app works integrating at some point not not for this build but like in in phase two integrating the AIS in into things or maybe maybe doing like the survey AI while we're releasing this because what Raphael just showed me that UI is perfect bringing in then the LLM that that looks at the images and gives that feedback back that there's a mesh there. So, like there's those sort of things that I'm thinking about and there's a lot. Um, and I want to make sure that we're we're well organized with all this that you guys are seeing the same things I'm I'm seeing and we're all aligned as to okay, these are the deliverables and this is the things we can do and what needs to be punted. We we figure figure it out. So, as as we go along, at least we're agreeing these are the things we're going to attempt to attempt to to bring in.  
**Joe Green:** Yeah, cool. Uh, sorry, Louis.  
**Luis Galeas:** Yeah.  
**Joe Green:** You again.  
   
 

### 00:41:14

   
**Luis Galeas:** So I was going to u make a recommendation here. So I think that uh I know we're coming up with some wireframes, right? And you know uh so internally we use this thing called mental models. And I don't think we should go as far as sharing these because they're not really in a pos they're not really at the um at the level where they're meant to be shown there. But what we could do and this will be a good exercise for us uh is we could tidy tidy up some summaries where we would say like look you know this is uh what we so sorry I'm going to speak a bit in internal amber language for a second. So guys, if you think of like the last layer just before we have the um u the wireframes, right, where we have UI descriptions, uh if we could somehow have like kind of summaries of that last layer of the DAG, uh in a way that it allows us to classify information, maybe in a way that we can put it in a deck and then we could have an appendex where you can actually see what the uh different uh UIs are.  
   
 

### 00:42:11

   
**Luis Galeas:** Uh, and having some slides like that that we could just give to Chris, I think that would that would do the job. Yeah.  
**Joe Green:** Yeah, I was thinking exactly the same  
**Chris:** And that way that from a project project standpoint too,  
**Joe Green:** thing.  
**Chris:** we're going off of the same list and we're checking things off as we're going along and moving things along around as we need to.  
**Luis Galeas:** Um  
**Chris:** But having it especially speaking to our CMO like the interest is you know how business is it's when when can we start selling this and what are we going to have we start selling it. I I already created a matrix. In fact,  
**Luis Galeas:** yeah.  
**Chris:** I'm going to share back in in Slack with you guys. Um, I I'll be honest, I haven't had a chance to farad it out to make sure that everything aligns 100% with what what you we've talked about, but it's probably the same thing because to be honest, we're talking about the same stuff. And I started and started looking at what would be later toward towards getting to and you know what me do if you guys still have time I'll share with you real quick so I can show  
   
 

### 00:43:11

   
**Joe Green:** Mhm.  
**Chris:** you because the next step I was going to do with this is I was going to try out the because I haven't tried it yet the Azure DevOps only because I saw there was way of putting in more detail where we could export it out as like kind of a a product book. So I was going to give that a shot. Usually what I use is just a simple project management tool. Um so essentially where we are this is these are the categorizations of of the area. So like the hems app and the capabilities that are built into that. This shows where we are today. There's a lot of nos in here and a lot and a because there's a lot and they're looking at future wise. This is where I'm seeing with us for for this this current build as to what what this first the first engagement will look like. There's a second phase I'm calling the swagger where it's like we're getting things things going and  
**Joe Green:** Mhm.  
**Chris:** this is in market and we're building off of it and we're able to make make revenue off of it.  
   
 

### 00:44:15

   
**Chris:** There's probably one in between here but I'm hiding it for right now. And then like the first phase would be third phase would be the data institute. it won't be necessary to create syndicated data and have that resold. Um the bigger things in here like the hems platform which this is the the SAS and then the hems hems and hems mobile app SAS. Um so that's that's like currently not available in the current platform. it would be with with what we're doing here as a pilot um help desk mobile app. the bigger things we start getting into the type of clients that that we're able to handle the web portal what that what that would look like what would be included with that like we already talked about like reporting I had that somewhere in here where I punted the reporting into PowerBI for for the for this goound for for the first eight weeks and then it would be like for swagger that would be integrated into a web portal like so those sort of things are built in here Um this resonated well with leadership because they wanted to see all the capabilities where we are in a simple form form factor not pointing out well this  
   
 

### 00:45:31

   
**Joe Green:** Mhm.  
**Chris:** color works this way and there's this capability it's in general so I try to be as general but detailed as much as possible where there there's some things like um we were just talking about like the events in ed educator matching where where if we have the educator scoring we can do that that sort of thing that I'm seeing in that that that phase one build and then I'm seeing that being market ready when we go to swagger. Market ready mean expanding to the affiliates where now the affiliates can do this and we're we're doing this for the core as well.  
**Joe Green:** Yeah.  
**Chris:** So I don't haven't there's not all that detail in here but now I'm talking to you like  
**Joe Green:** Yeah.  
**Chris:** there's I kind of need need to break this out in terms of what's what's affiliate what's  
**Joe Green:** Yeah.  
**Chris:** core and what SAS is.  
**Joe Green:** Yeah. I mean to to Louis's point like we've got some internal uh like frameworks and stuff that we use that are super similar to this and we'll add a bit more color you know like at the top there you got event management and you know yes but like okay what does yes mean?  
   
 

### 00:46:32

   
**Joe Green:** What does event management mean? What's going to be included? What will you be able to do? What won't you be able to do?  
**Chris:** Yes.  
**Joe Green:** So we can um there yeah some more details than you probably need but we can reformat it fairly easily to give you like um to give you what you  
**Chris:** Oh, and and some of these I've been working on those outlines for you like the profiling of the data.  
**Joe Green:** need.  
**Chris:** So, I don't mind doing that work so that you guys are working on the base. So,  
**Joe Green:** Mhm.  
**Chris:** it saves saves you time where you're asking questions as opposed to doing the discovery on it.  
**Joe Green:** Yeah. Yeah.  
**Chris:** So that that's where I'm I'm thinking where there could be a lot more documentations where you and like Miro has some other Jurro at Jura has does this where you list out all these capabilities and things you're going to do for the project and then there's outlines and details for every freaking one of them. I don't know if that's necessarily the way you guys want to work.  
   
 

### 00:47:22

   
**Chris:** I'm not saying you have to, but I don't mind providing an excruciating amount of detail for you guys just because it's been sitting in my head for a while and I've been trickling it out. There's there's always stuff to do. So, I I I don't mind helping out with that so that you guys have have clarity around what what  
**Joe Green:** Yeah.  
**Chris:** those details look like and then tweak it. I'm not saying at all have to be exactly like that because I'm going to lean on you guys for the execution part.  
**Joe Green:** Yeah, for sure. Yeah. No, it sounds good. I've got a good idea, I think, of what like a next step is. And then to your point, I think there'll be some bits that we need to go into excruciating detail and like other things that we probably don't need to. But I think once we map it out, then we can go through with you and then we can Yeah. easier to see where those spots are and then um and then dig into  
   
 

### 00:48:09

   
**Chris:** Okay,  
**Joe Green:** them.  
**Chris:** that sounds  
**Joe Green:** Cool.  
**Chris:** good.  
**Joe Green:** Um yeah, that's it from from from my side. I think um next steps we'll obviously work on that um the map we just talked out at the end at the end of the call there and then in parallel uh we'll continue to uh build out the wireframes um from like a front end and UI perspective. Uh and then we'll also keep digging into the into the data and back end as well so we can start mapping and thinking about  
**Chris:** Maybe.  
**Joe Green:** that.  
**Chris:** And so then the last thing I was going to talk just just with Lewis after this, but maybe I'll I'll talk with all you guys here just to put a bug in your ears. And so if you want to take this offline with just me after I I asked the question,  
**Joe Green:** Mhm.  
**Chris:** we can do that. I am calling a little bit of risk on our AI projects release because I just had a show and tell yesterday and it's behind and it's not behind on the actual capabilities.  
   
 

### 00:49:03

   
**Chris:** The UI sucks and it's not at all against like the some of the specs I have. That said, there might be and I'm not sure sure how how much how much time you guys have, but I might ask you guys to pitch it in and help deliver it from a UI perspective and take what we have built out so that we can get to a um a use usable case there. There's two AIs essentially. There's going back to that that that wireframe I showed you with the emails coming in.  
**Joe Green:** Mhm. Yeah.  
**Chris:** There's the there's the answering service for that.  
**Joe Green:** Yeah.  
**Chris:** Currently, it does not have a space where a human would manage it. It's just the emails come in and I don't know what what they're doing with it to be honest. I was really pissed off when I saw it yesterday. Um and the other the other one is the survey which Raphael has a UI basically built out in a mobile application.  
**Joe Green:** Mhm.  
**Chris:** requirements were they would be mobile friendly. I'm not convinced it's mobile friendly because it's web- based and it really needs to be an app because of the pictures and the RAM and and all that.  
   
 

### 00:50:12

   
**Chris:** Um, but the I know I know for sure the AI works as intended where it identifies how many facings are on a shelf. It tries to identify the brand to best of its ability and and tries to put in the price points. So those capabilities are there. It's just the setup and the UI on it is not good. Um, so from from a a time time frame, I'll probably know for sure Monday if this this is in full risk or not. And I wanted to see if this be something that that you guys could pick up as an early delivery in between  
**Joe Green:** Mhm.  
**Chris:** all this.  
**Luis Galeas:** I mean I'll I'll I'll chime in a little bit here. So I think that um it depends on what you mean by early delivery. Um as in you know is this is what you're looking to do to integrate it into the existing software that you  
**Chris:** The the good part is the survey would not be integrated.  
**Luis Galeas:** have  
**Chris:** It would be a standalone. So we could even just take just a a rudimentary mobile app that just does that and hide all the other stuff like what has built just gimp it and just solely focus on the survey part of it and and have it for that.  
   
 

### 00:51:32

   
**Chris:** It wouldn't even be a full roll out. it just be an MVP that would be tested just to get the feedback and maybe do some live surveying. And on the email part, on the email part, it's supposed to be integrated into into Hems as another page. Um, but it could be a separate a separate management port points. It doesn't have to be like native within it. It could be a se separate screen because the way that process works is it's capturing the emails trying to determine if there's enough information for the event. If not, have a response process and if it does we we already have a staging area for the drafts where it goes to. So it basically just sits on top of the application and in between the emails and the application essentially. So it doesn't need to be fully integrated. there's already an API that it's connected to. It's just the UI sucks where the user is not able to manage the emails that are coming in to be able to respond to that to move it over into the the API to be be passed on.  
   
 

### 00:52:46

   
**Luis Galeas:** Okay. Um Okay. Actually, I'm not going to try to boil the ocean in one day. So let us know next week what your thoughts are and then um I mean I know that on our side I mean I know it might sound uh simple but there are a few things that you have to do a setup.  
**Chris:** I  
**Luis Galeas:** So you know even if you're do just doing a rudimentary mobile app sometimes like the the baseline of what you  
**Chris:** know.  
**Luis Galeas:** have to do in the first place like you know getting a credentials you know figuring out the uh you know the test flight bills it's all this stuff that you just have to have as like scaffolding uh would take a bit of time.  
**Chris:** Okay.  
**Luis Galeas:** So we might have to shuffle some things around uh if that were the case. So yes it's something we can uh we can certainly have a look at. Uh but yeah, let us know if you end up thinking, okay, you know what, this is definitely at risk. Uh and then I can give you a more uh informed  
**Chris:** Okay.  
**Luis Galeas:** opinion.  
**Chris:** And and that that's fine. I don't mind mine waiting till Monday. I just wanted to call it out today just to get a feel for it and at least put it on your radar in case it comes down to  
**Luis Galeas:** Yeah.  
**Chris:** it and we have a conversation Monday.  
**Luis Galeas:** Okay.  
**Chris:** Cool. All right, gentlemen. Well, I appreciate it.  
**Joe Green:** Yeah.  
**Chris:** I will put this matrix into the the share drive so you guys will have it.  
**Joe Green:** Awesome.  
**Chris:** Um,  
**Joe Green:** That' be helpful.  
**Chris:** and I won't I'm thinking if if it's if it's worthwhile separating this out as what what would be SAS, what would be core in the future state, I can try to do that as well as as separate out as well. Um, okay, cool. All right, gents. Appreciate it. Sure. Sure. I can see  
   
 

### Transcription ended after 00:54:40

*This editable transcript was computer generated and might contain errors. People can also change the text after it was created.*
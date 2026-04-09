Apr 8, 2026

## Ambar / Hart \- Weekly Sync \- Transcript

### 00:00:00

   
**Joe Green:** How you doing?  
**Rafael Ricco:** Good.  
**Joe Green:** It's very uh it's a nice such a nice day here in the UK. I'm very excited that it could be spring even though I know it's going to get cold again in the next few days, but feels like a long time coming. Yeah, Ethan, I was uh messaging Raphael, but I think we talked about it yesterday, but I think main thing I want to go through, Chris, is those final uh tickets in the sheet that are tagged as like need discussion. So, we can get alignment on those and then we're we're pretty much unlocked to wrap everything up hopefully. Um, but it's  
**Ethan Brown:** Okay.  
**Joe Green:** possible.  
**Ethan Brown:** I see you've already filtered it down to the ones that need discussion. Um, does this include the ones uh that we didn't get to in our internal discussion yesterday?  
**Joe Green:** Yes. Yeah. Some of them some of the ones were were phase two, but I uh I went through them this morning and just added like a few questions.

 

 

### 00:01:10

   
**Joe Green:** Um, actually quite a few of them are actually related cuz a couple of them at the bottom are around like the geographic stuff. Um, so hopefully we get, you know, most of them covered today.  
**Ethan Brown:** Okay,  
**Joe Green:** Uh, and then phase two ones I think we can we can we can handle  
**Ethan Brown:** great.  
**Joe Green:** later.  
**Ethan Brown:** Yeah, of course.  
**Joe Green:** Uh, and Raphael very helpfully um like finish tagging things as uh, you know, which stuff has been built or which stuff needs updated. So, we've got quite a nice like backlog to to work through as well. Awesome.  
**Ethan Brown:** Excellent.  
**Rafael Ricco:** Yep.  
**Joe Green:** And um yeah, sounds like you're making good progress on the actual kind of build and setup of the uh like the foundations, I guess, from your side, Ethan, as well, which is which is  
**Ethan Brown:** Yeah. Um,  
**Joe Green:** cool.  
**Ethan Brown:** and we need to talk to Chris about staging environment. Uh, my understanding is that they want to host it on their own AWS. Uh, they definitely want to host production on their own AWS account.

 

 

### 00:02:09

   
**Ethan Brown:** We're not sure about staging.  
**Joe Green:** Yeah.  
**Ethan Brown:** Um,  
**Joe Green:** Yeah,  
**Ethan Brown:** and Okay,  
**Joe Green:** it was on my list from uh yeah having some chats with Tom.  
**Rafael Ricco:** Where  
**Ethan Brown:** great.  
**Joe Green:** I think preference by the sounds of it at least to start with is probably we host it ourselves on staging.  
**Rafael Ricco:** is  
**Joe Green:** Um yeah,  
**Ethan Brown:** It's fine.  
**Joe Green:** which kind of unlocks us and then yeah we can handle the migration later. Okay. Wish I could just set it to like auto accept people, but I think it's like an org level restriction. I have to manually admit people. Hey  
**Chris:** Hey,  
**Joe Green:** Chris.  
**Chris:** my camera is all whacked out and like all zoomed in. I have no idea what Google's doing now.  
**Joe Green:** Yeah, it can be a bit temperamental.  
**Chris:** Oh boy. Alrighty. Um I'm all right.  
**Joe Green:** How you  
**Chris:** I'm feeling a little bit better.  
**Joe Green:** doing?  
**Chris:** So I got a little more energy. Still not 100%, but you know, I'm good.

 

 

### 00:03:22

   
**Chris:** Nice to see you back here,  
**Joe Green:** Awesome.  
**Chris:** Joe.  
**Joe Green:** Yeah, good to be back. Good to be  
**Chris:** I was I was I was getting spoiled with Ethan,  
**Joe Green:** back.  
**Chris:** so you know now  
**Rafael Ricco:** Yeah.  
**Chris:** again.  
**Joe Green:** Yeah. Um, no, good to be back. It's uh I mean it's amazing how much you can like feels like you've only missed like a week or so but like the progress made and the conversations been had is uh it's pretty nuts.  
**Chris:** You miss a day, you miss  
**Joe Green:** I know. Yeah. Um but anyway, yeah,  
**Chris:** everything.  
**Joe Green:** hopefully just about back up to uh back up to speed now. And actually the the capabilities matrix which we'll we'll focus on today um has been  
**Rafael Ricco:** Yeah.  
**Joe Green:** super helpful for that just to kind of recap on where we are, what we're doing, what we still need to do.  
**Chris:** Yeah.  
**Joe Green:** Um,  
**Chris:** And it's going to help for me to kind of communicate to leadership as to where we are my weekly meetings and and also just kind of show where you guys are going because I I've been I've been happy with the way you guys have been organized,

 

 

### 00:04:10

   
**Joe Green:** Awesome.  
**Chris:** how how well you've been receiving and I want to make sure that communicates well to the rest of the team as well too.  
**Joe Green:** Um, yeah. Is is Leah joining? I know she was uh planning to join these sessions, but I'm not sure if  
**Chris:** So, she will be on these and if she has time,  
**Joe Green:** she  
**Chris:** if she feels like jumping on, she will. But honestly, she's leaving most of it up up to me. So, we don't have to wait for her to join. It's more so if she needs to,  
**Joe Green:** cool.  
**Chris:** she wants to just be in a loop that these meetings are happening and if she needs to join, she'll join.  
**Joe Green:** Yeah, perfect. I thought that's probably the case. So, um yeah, with that in mind, we can uh we can get started. So, um yeah, as a quick update, we've been iterating on the on the capabilities matrix. Um I think you went through with with Ethan and and started to go through some of the ones that are still open for discussion.

 

 

### 00:05:02

   
**Joe Green:** Um so we've now narrowed that down um like internally plus some of the conversations we had with you and there's now looking at phase one only some phase two stuff we obviously would need to discuss but we can worry about that later but for now there's kind of nine items or nine rows that  
**Chris:** Yeah.  
**Joe Green:** are still tagged as need discussion. So I think for today's session we'll focus on those talk through those quite a few of them are like interlin to be honest a lot around the the kind of geographic um uh management and how that kind of from a schema perspective works. So but um I'll share my screen and we can work through those um together and then  
**Chris:** Sure.  
**Joe Green:** once these ones are kind of aligned um we can talk about it at the end but like the the best next steps really for you to circulate it with the with with the rest of your team and and get kind of final approval. But um I think first and foremost let's uh let's get started on uh some

 

 

### 00:05:53

   
**Rafael Ricco:** That's  
**Joe Green:** of these items for uh discussion. So we've added some questions and stuff uh where we can to help kind of uh guide the conversations. Can is uh can you see that? Is it too small? Is it is it readable?  
**Chris:** Um, I need to just zoom into it, but I can do it on my screen.  
**Joe Green:** Okay, cool.  
**Chris:** Yeah.  
**Joe Green:** Make it a little bit bigger. Um so the first one at the top here which is about um the event creation and configuration. So creating um events with necessary details, location etc. Um and this specific one is talking about um how we configure the uh venue and premise types. So I think the current platform has like 12 specific premise types. Um at the moment I think we only have a few. So but essentially the question here is like we don't want to hardcode those venue types. So we're assuming that within the system they would need to be configurable. you can add uh a new venue and tag it with uh you know whether that's uh you know beers, a cannabis uh venue etc. So there needs to be like a certain schema and structure around it for you to create and manage those venue types.

 

 

### 00:07:04

   
**Joe Green:** Is that  
**Chris:** That That's right.  
**Joe Green:** right?  
**Chris:** Um, let me pull up the data structure I have here just to look at what we have.  
**Joe Green:** Mhm.  
**Chris:** Uh, let me go here. Tables the full one. Where's the one I have organized? Here we go. Um, good. Sorry, I'm just looking at it because now we're doing this C change for educator to ambassadors. It's going to create a lot of um I'm  
**Joe Green:** Yes,  
**Chris:** trying  
**Joe Green:** that have to admit our document hasn't quite been updated yet,  
**Chris:** see that's fine.  
**Joe Green:** but um we will moving forward.  
**Chris:** I wasn't expecting to be done immediately, but please communicate to you guys as soon as possible.  
**Joe Green:** Yeah, that's helpful.  
**Chris:** the in in the in the data data. Do you notice that it's it's labeled premise types?  
**Joe Green:** Mhm.  
**Chris:** See if I find something here. So, there's that. So the premise type, so premises in all this, I'm not look not finding the the the table with all the premise types. Um the premise types should really be I would challenge and say it's really four.

 

 

### 00:08:47

   
**Chris:** Now it might be under the account where under premise type for the account and this is where this could be bad and bad data. Um, so premise for the account because I do see it under the account table from a standpoint of the events and I want to preface it like like we really should talk about more like activities like the way way Raphael has for that hierarchy. Um, for activities it should be based on the type of venue. So maybe that's what it is. If it involves cannabis, then there's different types of of of premises for cannabis that I'm not aware of and I'm not as up on for alcohol and what we're focusing on. There really is just four. It's a a division of on premise and off-remise. And it basically refers to where does the consumer consume the alcohols alcohol. If it's off premise, that means it's a store. So they're they're consuming it off of premises. It's two types.  
**Joe Green:** Mhm.  
**Chris:** It's either independent or it's a chain. And then for on premise it's you're it's like a bar.

 

 

### 00:10:04

   
**Chris:** You're consuming it on the premises. So that could be a um that could be be a  
**Ethan Brown:** Thank  
**Chris:** independent a chain for our purposes because we can do special events.  
**Ethan Brown:** you.  
**Chris:** It could be like a special event. Now, the premise list you have there might go into more detail. That's more of a classification of the account where that would fall under. And the only thing I couldn't speak completely of is the cannabis part because I'm I'm just not as up with it. And I'm apologize, guys. Not finding my  
**Joe Green:** No, all good. I think that's helpful. Particularly, I mean,  
**Chris:** diagram.  
**Joe Green:** looking at phase one and and the pilot program, it sounds like it will be like a predetermined set of premise types that um people can choose between for events. Like it doesn't need to be too flexible too early.  
**Chris:** Yes,  
**Joe Green:** as it grows, we add them on and then maybe we give flexibility. But for phase one, that seems pretty  
**Chris:** correct.  
**Joe Green:** clear.  
**Chris:** I think we do need the flexibility if we're looking at other indust industries like cannabis where I'm just not as familiar as to what those premises would be and what those types would be what the need would be for

 

 

### 00:11:06

   
**Joe Green:** Yeah.  
**Chris:** assigning. But from an activity standpoint, knowing those those five essentially, then that allows us to do filtering for the reporting and it also allows for when you're building the campaign to note, okay, if it's an on-remise independent activity, these are the things we can do in that. If it's a chain, sometimes there's some restrictions. If it's a special event, it's usually executed this way. So having that that that that division at minimal would be the be best  
**Joe Green:** Yeah, absolutely. That's clear for me for for phase one. Um I think we we keep it simple and then we can we can build on top of that no problem in the  
**Chris:** and I'll just I'll just take note because I know we do beer beer falls the same  
**Joe Green:** future.  
**Chris:** way but beer really falls under under really the config other other configurations. It's still very similar. Um it is executed slightly different. Um,  
**Joe Green:** Mhm.  
**Chris:** but I think we can still but we we still need to have that discussion. I don't want to build it out without knowing for those beer people what we what we need and there's other things that we're tagging with it.

 

 

### 00:12:19

   
**Chris:** So when we look at the supplier the supplier is built is built toward and towards their portfolio. So beer is attached to the supplier. That's a way  
**Joe Green:** Okay.  
**Chris:** categorizing.  
**Joe Green:** Cool. That's uh that's clear to me.  
**Chris:** Okay.  
**Joe Green:** Um any any question anything to add Ethan or Rafael?  
**Chris:** Oh s\*\*\*.  
**Joe Green:** I think that was pretty clear. And just just B if you uh if you have anything to say.  
**Chris:** a  
**Ethan Brown:** Um yeah,  
**Joe Green:** No problem.  
**Ethan Brown:** I just I just want to uh ma make sure that this is in included in the uh the data design uh discussions um because we want to you know support what we need to do now for phase one but obviously we want to make sure for um uh the um future phases and um the data institute We have flexible enough coding to support all of Hart's future needs.  
**Chris:** agreed and I was answering Joe's in Joe's Slack response earlier about hierarchies. I think we need to create those vertical tables of what the account hierarchy looks like, what the um c campaign to activities hierarchy looks like.

 

 

### 00:13:42

   
**Chris:** That way you can start seeing okay these are the the the the data that that falls in line with these these types and types of groupings of data. And then we can start talking about what the schema would look like because then when you essentially when you get to the campaign, you're going to be linking the account the account data data to that. You're going to be linking the the brand ambassador data to that and the item information to that and all that. So, I think it's good for to do that. I'm putting that on my list to help you guys out with at least laying that out. But by all means, like I'm going to lean on you guys to make the final decision as what's the best way of doing this. I'm just thinking that more of long verticals and then we can create the schema based off of that and get to a view off of what the needs are for later on as we start building all this out.  
**Joe Green:** Yeah, absolutely. That's a good point.  
**Chris:** Cool.  
**Joe Green:** All right.

 

 

### 00:14:43

   
**Joe Green:** Um, so yeah, the next item is around um the billing um kind of accounting structure that's in place at the moment. Um and as we understand it it's um fairly rudimentary at the minute but there is a uh connection to QuickBot Quickbooks as we understand it at the moment and particular and this is be the focus for phase one is there is an export functionality that allows people to take data from hems and import it into QuickBooks. So the question really is trying to understand in a bit more detail within the current system what that export actually means in terms of you know what's been exported. Is it uh you know as simple as exporting a CSV that then gets needs to be formatted or structured in a certain way to input it into um QuickBooks and what's the process for doing that to make sure that we are accommodating that in phase one. Um again obviously we can look more about integrations in phase two but for phase one like how that  
**Chris:** So,  
**Joe Green:** export works.  
**Chris:** I think we need to bring in somebody who's utilizing this um because you've got part of billing could be considered payroll.

 

 

### 00:15:52

   
**Joe Green:** Okay.  
**Chris:** And you know, I'm not as familiar with ERP systems and a lot of what the current application does is ERP. It doesn't do the accounting,  
**Joe Green:** Mhm.  
**Chris:** but it does a lot a lot of the building for that. Um, so I would say we should tag that and have bring in somebody from from our office that that works with us in terms of what the needs are. We could probably tag Leah or Larry Larry for that.  
**Joe Green:** Yeah, I was going to  
**Chris:** So I think that's an that's a that's a that's a theme question and  
**Joe Green:** ask.  
**Chris:** probably Larry because he's closer to the payouts. So I can throw it towards both of them and see when  
**Joe Green:** Okay, perfect. Yeah, that'll be super helpful.  
**Chris:** we before we start building on this I think like like we have with the process we talked about um I think you were out Joe. I think just tagging that themesmemes to fair it out these these how it currently works so you guys have a better idea to understand it would be the best way of handling

 

 

### 00:16:52

   
**Joe Green:** Mhm. Okay, cool. Yeah, I mean we're thinking um I think Lewis mentioned as well some  
**Chris:** it.  
**Joe Green:** calls like with Leah where we need to as well to bring in those SMMES. Um, so either setting up a call or tagging them straight in the document like which one would they are they happy to jump in and and answer in the sheet directly if we need  
**Chris:** Yes. Yeah. I I was trying to get make this more formalized and there was some resistance from the team of wanting to really  
**Joe Green:** to.  
**Chris:** formalize this. So it it came down to I tag who I want for these. So nobody's so for this I would even say we can add another column in here  
**Joe Green:** Okay.  
**Chris:** forme referral to add Leah and Larry on on for one and  
**Joe Green:** Yeah, it's a good idea.  
**Chris:** I would suggest that before we start working on on this we we bring them in on a meeting and have them involved.  
**Joe Green:** Cool. All right. Um, make a note of that one.

 

 

### 00:17:56

   
**Joe Green:** Cool. So uh the next question uh in a similar vein or next topic uh the questions in a similar vein around the uh educator expenses uh process. So um obviously you understand the concept that educators will need to purchase um materials or um I don't know whether that's kind of clothing or things to support the event um with their own uh with their own money and then expense that back afterwards. Um I believe you touched on this a little bit before but really we want to understand a bit more about again what's required for phase one around the receipt scanning. Is it as simple as taking a picture of the receipts that they're then recorded and then they need to be manually digested by a member of the team to then record that in the accounting or the expenses system? Or does it need to be something more comprehensive uh for phase  
**Chris:** So there is um I think we're going to need to  
**Joe Green:** one?  
**Chris:** do a little more digging on this as well because there's there's two things involved in this.

 

 

### 00:19:03

   
**Joe Green:** Mhm.  
**Chris:** Um so currently the way the process works is the brand ambassador at the at the the point of finishing the event activity they do have money that they they they they spend. So they bought drinks and the account gives them the receipt. That receipt is scanned into the current current application and uploaded. What happens manually is the educator will manually put in what the expenses are in terms of what the spend was, what what the taxes is and and all that. And then the manager then has an opportunity to to approve it, make sure that all the numbers are correct in there that it it lines up with the receipt and then that gets submitted to be paid and paid back. Um the other wrinkle with this is we are we signed a contract with a company called ramp that does a lot of this already. I am not familiar and and finance was telling me Ivy from finance was telling me that they do have an API. So this might be something that maybe we can just integrate instead of having you guys build from rebuild from scratch.

 

 

### 00:20:15

   
**Chris:** Um it would be good from our purposes that OCR kind of capability we were looking at to be able to be able to just scan it try to fill in the form. Um that was the the main goal that we we were looking looking at as a further development. Um, so with this I would say let's tag Ivy asme that before we start and start diving deeper into this I think we need need to bring her in on on the conversation and understand this because I don't know a I don't want and and when the announcement of RAM came up the the discussion came is do we need to still keep putting this to hems or is this going to be into ramp is it going to be a separate application or do it in in the middle of the application so I I think it's good for us to have that fair not not double double dip this, but at the very least at the very least as like a an initial have a part of the flow built into the mobile app where the brand ambassador is able to take a picture of the expense the expenses or multiple pictures of the expenses for for the the activity and that gets attached to the event.

 

 

### 00:21:28

   
**Chris:** So then that could be be h handled afterwards.  
**Joe Green:** Yeah, I agree. I was going to suggest for for the pilot I think having just the we've already kind of got the functionality right taking pictures storing them having a separate area for expenses I think gives us like the the minimal uh requirement and then we can explore the uh into kind of native integration and figure out the most intuitive way to do that for phase 2 or phase three or wherever it falls.  
**Chris:** I'll take a look at as well. Um I can find some some completed events and see what that looks like because I I I'm not as close to this so I I don't want to misspeak and say this is how that works. But we definitely have that ability for for the input in of the of that capability and maybe in a phase two we can we can kind of narrow it down as to what specifically that needs to be in them. But I think before all this it'd be good to have that conversation with Ivy before before we get to the end of phase one just so you guys know if there's an opportunity to API something in or bring in ramp where that's just an app that opens up separately and handles it then let's just do that.

 

 

### 00:22:40

   
**Joe Green:** Yeah. Yeah, it sounds like a good approach. All right. Um, next item is around uh bulk event imports which I know we talked about um briefly before. So this is separate from um uh the email import and ingestion flow which is uh you know different topic but for uh or admins there as we understand it there is the ability currently to upload a CSV file to create like mult multiple events. I think we mentioned, you know, sometimes maybe 50, 100 events at a time can populate the CSV, upload them to the system. Um, and then that automatically creates the uh the events in the experience. I know like the adoption has been low. I the question again really is like do we need this for the trial clients or is it something that  
**Chris:** it.  
**Joe Green:** we can use later?  
**Chris:** I think we still do and I think it's just a matter of of an input. Um, and for the email AI, this could be a dual function. Essentially, we just need a a drafts like a bulk and bulk drafts and location.

 

 

### 00:23:54

   
**Chris:** Um, ideally with the way the AI email would work future-wise is once those events are approved, it would be sent to the drafts section. Trying to pull this up now so I can show you guys. But doing a um a CSV up upload I think is necessary just because from a client perspective in them utilizing this tool, if they have a whole bunch already made and they just need to just just assign it and they have their own process, this is an easy win for them to just get everything loaded in and upload it in and then it's there.  
**Joe Green:** Okay.  
**Chris:** Um  
**Joe Green:** Yeah, that's clear. I think for for the part, as you say, we keep it quite quite simple, quite basic. I I think you've got a template already. So, that's kind of the hard bit and then we can build on top of that.  
**Chris:** yeah and I and it doesn't and and I know there's some there's some  
**Joe Green:** All right.  
**Chris:** little things that it may need some tweaks where you have to have like all the extra detail.

 

 

### 00:24:57

   
**Chris:** I think the bulk thing is if you have a campaign to be able to put in for the entire campaign like what what's linked to the campaign essentially so you guys get an idea for it. If the idea would be is you you still would have to create the campaign like you couldn't create the campaign initially from this bulk uploader. So the steps would be the campaign's already been been established. This upload would be a way of assigning the accounts to activities to that campaign that's already existing. So it would just allow the user to do a a large upload of x amount of of activities without having to manually go through the process and recreate over and over for all the accounts.  
**Joe Green:** Okay. Yeah, that's clear. Um, and yeah, I think that that's fine for for phase one and as you say, like we can we can build that out and uh create something more sophisticated in the future and particularly with the uh system you're developing around emails as well to figure out like what the best way and most intuitive way to do that is.

 

 

### 00:26:03

   
**Joe Green:** Cool. The next item um which actually relates to a few around region and territory management um below as well. But essentially what we want to understand here is you know there's territory based uh filtering and that's set into the it's built into the schema um which from various viewpoints uh different users will be able to um you know filter events or filter educators or filter whatever by event location and therefore you know distance etc. The um question that Ethan raised really is um we assume or you know our thinking is eventually you know different organizations are going to have could have different uh geography categories. So some might use region, state, county, some might just use region and state, some might use zip code, some might there might there needs to be flexibility um in order to allow people to use the input the data as they want to. Our thinking initially for for phase one again is that we set what the sort of max levels are. So that might be five levels of region, state, county, zip, whatever we want to call it.

 

 

### 00:27:22

   
**Joe Green:** and organizations can populate that as they need to. They don't have to populate every single field. Um but we would just wanted to confirm that approach is a accurate and the assumption that there will be flexibility between organizations is is a fair  
**Chris:** think that's a good start.  
**Joe Green:** one.  
**Chris:** Um, I'm trying to think because as we start looking at a hemps 2 2.0 use for us, that would be what we use. We divide it out by territories, by burrows of of this of New York City. And I'll be honest with you, I'm not sure if the burls are labeled out by zip code or not. Um um having it by state, city, you said county, zip code,  
**Joe Green:** Yeah, I mean this is all open for debate, but that's we're kind of thinking what the max number are.  
**Chris:** state,  
**Ethan Brown:** Uh can I just interject here?  
**Chris:** what?  
**Ethan Brown:** Um my my thinking is that like we don't need to decide the actual you know geopolitical entities that we're going to support. I think each organization gets to decide like hey these are my regions and that can be anything they

 

 

### 00:28:40

   
**Chris:** agreed.  
**Ethan Brown:** call red blue and green for all we care they know what those regions mean and how they're organized hierarchically Thank you.  
**Chris:** I don't see currently the need to go national. Um, a lot of the is going to be within states. So, having that depth within the states is good. Um because it also comes down to assigning the the brand ambassadors to those territories because I see this as more of a brand ambassador management assignment. So that aligns with their their route to markets more than it is a reporting feature because it's more of an like an operational hierarchy. So, state, county, city, zip code, um, I definitely see that. I'm just taking a beat here thinking because I I I don't know what a what a deeper one would be. And the burls like in in New York, I don't even know how that would come up. So, I I don't know how how to handle that. I'm just I'm thinking duality like like at least for for the affiliate build for a client build at the very least state, county, and city maybe zip code as as an extra detail.

 

 

### 00:30:13

   
**Chris:** Even though I hate zip code because zip codes for mailing purposes, not for anything else. Um but that that works. Um, so I think if we can we go with that and then see where where it is in the later later phases or see get the get the response back from clients to see as as as a build because I think that's as as deep as we we really need to go and only and I would just say look here real Because even if you look at like the burrows of like New York, just point the map here is not as familiar. It's kind of aligned with with cities and probably zip codes, too. So, let's I I would say let's let's go with go with that for right now as a first release.  
**Joe Green:** Mhm. Cool. And yeah, we can um we can definitely adapt that. And I think to Ethan's point, if you give them the framework and allow them to define their own uh areas and stuff that that organization operates in,  
**Chris:** Yes.  
**Joe Green:** then that should solve for quite a wide wide user base.

 

 

### 00:31:45

   
**Joe Green:** It's all clear for you for you, Ethan. I know it's one you um you raised. Um all right uh moving on to uh the next item is around uh the kit and kit readiness. So um understand that you know when an event um is set up or before an event is carried out there's often um a kit that educators will need to uh pick up or um get delivered or however that's handled. Um and there's a notification system around that so that they can get notified that hey the kid is ready please come get it before you can um go and execute the event. Um quite a simple question really, but to say that is that does that notification system or that process around kits is that consistent across organizations? Again, less maybe of a concern for for phase one, but we're assuming that basically it is. It's going to be the same like notifications and process that across the  
**Chris:** Yes. Yeah.  
**Joe Green:** board.  
**Chris:** The assumption is that's best practice. So, yes, because no m because no matter what,

 

 

### 00:32:56

   
**Joe Green:** Okay.  
**Chris:** there's going to be something that's that's needed for those events. Um, and I would also state the list of that should live in at the campaign versus premise level possibly. Um, because because when you're setting up the actual activity having what's known in the system as the evaluation, which is really the checklist that goes with the kit. So essentially, they're two of the one one of the same. So if you look at the process, there's like the evaluation, there's the kit. Essentially, it's the same thing. It's just is the the evaluation, which is what basically the outline of what to do, complete with all the things, and then the kit is is everything together. So I don't necessarily want I think merging those together is fine because I think there was more of a manual process whether the evaluations were printed and all that. um getting the kit together is that outline of what what the actual event needs are, what what to expect in a kit, how to actually perform it as something that that can live digitally or can be printed and put with the kit.

 

 

### 00:34:09

   
**Chris:** I'm just just bringing all that together. Does that help?  
**Joe Green:** Yeah, I think so from from my perspective like that the actual kit itself obviously is going to change but this the process and the steps from like a notifications and assistant perspective is going to be the  
**Chris:** All the same.  
**Joe Green:** same. Yeah. Yeah.  
**Chris:** Yes.  
**Joe Green:** Okay, cool. Um Mhm.  
**Chris:** And one one last thing and I would state as well. So that that managers can trigger kit ready notification. That's what what currently doesn't stay is isn't in hems currently. Right. Right now they're just button colors. They don't I I I think one of them does send out a notification, but that does need to be part of a formalized process. And I remember Raphael, we went through this with the demo, like when you go through it now, you should now you should be be able to say, "Okay, the kit needs to be built. This is what needs to be in the kit. The kit's built and it's ready to be picked up so that the manager picks it up or the educator picks it up." Like there's some sort of notification process that goes with that.

 

 

### 00:35:16

   
**Joe Green:** Yeah, that's clear. All right. Uh just a few to go. As I say, two of these are geography related. So, a couple uh last ones to wrap up. I know we're we're at time. Hopefully,  
**Chris:** I'm I'm I always give you guys guys more than an hour because this is important.  
**Joe Green:** you're right to run.  
**Chris:** So,  
**Joe Green:** Yeah. Yeah.  
**Chris:** don't worry.  
**Joe Green:** Cool. Um so yeah this one around uh reporting analytics um having reports filterable by premise type distributor supplier and account. Um the question here really is it seems quite straightforward that there's there's at the moment there's four entity uh filtered report views. I can't remember off the top of my head exactly what they are. Do we just need to follow what the existing filters uh for reports are or do we need to do we need to or want to expand uh upon  
**Chris:** I I think I think this for this first goaround just so because we  
**Joe Green:** that?  
**Chris:** we could spend a whole phase on just getting the reporting.

 

 

### 00:36:19

   
**Chris:** I think you know what's what's pre-existing to replicate that is good.  
**Joe Green:** Yeah.  
**Chris:** So I I would suggest you look at the reporting that's currently in the application. let's replicate what's there to as a starting point and then we can have discussions as to where we can go next with it because essentially what's what's going to be needed is just simple reporting just to be able to see what's what for the campaign where are the results how many were  
**Joe Green:** Yeah.  
**Chris:** executed um the demographics la basically all the all the simple rollups all that stuff and all that could be in in a um big simple reporting  
**Joe Green:** Yeah. 100% agree and I think particularly with things like reporting,  
**Chris:** screen,  
**Joe Green:** you know, it's often easier to approach it that way and then you figure out what's missing, what you actually want to dive into a bit deeper and then we can we can build out on top of that on phase two, etc. So, yeah, that aligns to what we're  
**Chris:** especially especially since you you guys already have the examples.

 

 

### 00:37:10

   
**Joe Green:** thinking.  
**Chris:** I think that's a a good way to just say, "Okay, we're going to replicate what's currently here." And while you're doing that, if if you see a cool add-on, I'm I'm okay with that. doesn't have to be exactly one to one and we can always try that in try that out and then we will in the later phase I would just tag that as to we can dive deeper into what what what would the next next steps be what would that that look  
**Joe Green:** Mhm. Yeah. Perfect. Um, cool. And the final uh point for discussion um which actually might be might be a bit of a duplicate or uh quite similar to the point we just talked about. So this is about um platform administration. Um so for admin screens for admin users uh the ability they will have editable lookup tables for things like tags, sizes, types, programs and other configurable reference data. Um which is as I understand it you know it's quite important it's in the current system then when the admins are able to create new labels and new uh new new tags etc.

 

 

### 00:38:28

   
**Chris:** Sorry. Are you are you on that region management or is that above  
**Joe Green:** Does this need to No, sorry.  
**Chris:** that?  
**Joe Green:** We're in uh this row here, 105\.  
**Chris:** Okay.  
**Joe Green:** So, yeah,  
**Chris:** Okay.  
**Joe Green:** the the region management ones I think we've we've we've is is essentially the same uh topic as the one we talked about before about how we manage those regions, etc.  
**Chris:** regions of the territories.  
**Joe Green:** Yeah. So yeah, the last item here at the bottom is um yeah,  
**Chris:** Okay.  
**Joe Green:** there's currently admin screens or there are admin screens for managing configurable reference data. So things like tags, sizes, types, programs, venue, categories, etc. Um which admin users will need to be able to configure um is this a systemwide thing or is this something that should be  
**Chris:** Yes. Okay.  
**Joe Green:** configurable by organizations? again. maybe simple phase one,  
**Chris:** So this is me meant for us  
**Joe Green:** but  
**Chris:** to tags, sizes, types, programs, venue, categories. So this is meant for us to be able to manually manage the accounts and manage the educators, manage it and the uh the supply and supplier and item hierarchies.

 

 

### 00:39:44

   
**Chris:** Um that's the idea behind this is is yes I feel like that's necessary because a lot of changes can occur and putting a ticket in to make a change seems a little silly if there's essentially what we would we would need to have is just it wouldn't be for everybody. It would only be for operators and certain people. And it would it would have to still if we need to create an item, it has to has to be unique and and force all the information in before it actually gets used. If there's a change, changes in items don't usually occur unless but but like there might be a need to update say a distributor identification number or supplier identification number um because there there's some there are sometimes there are some changes with that. So I don't see a lot of changes occurring. Now with accounts there are a lot of changes that do occur because that could that account could could change ownership. They could decide to go to a different concept. They could decide to get another license. Um um so that does happen quite a bit in terms of account management.

 

 

### 00:41:02

   
**Chris:** So what specifically with this what what's the the question around it? Is is it how we manage the data or is it how it gets it in or how much  
**Joe Green:** I think the the the main question I think is like how that then gets applied like  
**Ethan Brown:** That's  
**Joe Green:** is that a predetermined uh set of tags per account or per organization so that different uh organizations can have their own set of tags and data or is it something that's set at kind of the master heart level that then gets enforced or can be like  
**Chris:** Okay.  
**Joe Green:** edited upon. Um,  
**Chris:** So,  
**Joe Green:** essentially where in the schema is that kind of slotting in what's it configurable  
**Chris:** so, so the idea would be that we're we're categorizing the accounts ourselves and we have a  
**Joe Green:** across?  
**Chris:** hard-coded list of categorizations for tag for talk about accounts. So in some of the in the um in the survey data example I have in there which I probably would lean on for what what in a a account profile would look like and leading in to that that linkage to what the account master would be the accounts the accounts the the account in terms of tagging these accounts we don't necessarily need to go into that because currently we are not necessarily tagging these accounts as accounts from a business perspective because we're just executing.

 

 

### 00:42:36

   
**Chris:** The agencies are just the affiliates are just executing. The clients are just executing. For the client side, this is just a tool for them to manage the executions and not and as long as we have the key identifiers. So that would be the only thing I would say for the client and client build. They may need to have key identifiers added to the accounts so that that when they link this their data there's a way of linking it o over and matching this up one to one. Um, so I would say from a tag standpoint for items, for for salespeople, for um accounts, I think we just need to have some flexibility in terms of additional tags that are in in addition to what we currently have as our master.  
**Joe Green:** H. Yeah.  
**Chris:** So maybe so maybe for a client leaving for the client build in the data have a client um ID that they can they can then be able to identify that account and such in the data and we could probably have a discussion on how to do that from an API standpoint to bring that those keys over.

 

 

### 00:43:50

   
**Chris:** Um, but ideally TD link information which I shoot I gota circle back with that TD link information if like an account profile there there there's a there's a there's two uni unifying numbers the distributor account and account number and there's the TD link number so but I could see that there's a need for a third one from a client perspective where they would need to tag those as their own internal identifier.  
**Ethan Brown:** Do do you foresee in the future organizations ever needing to have their own list of accounts that Hart doesn't, you know, want to be involved in, you know, managing, knowing or caring about. like, you know, let's say I I was like, "Hey, I operate a chain of toy stores and I want to use your platform for whatever  
**Chris:** Well, from an account perspective, yes.  
**Ethan Brown:** reason.  
**Chris:** Items, it's basically I don't see with items and for for ambassadors, I don't see it for ambassadors. for accounts in and grouping that, you know, that's where I can see I don't want to overbuild that into it right now until we hear a need. I see this more as just the tagging data, but I I agree with you, Ethan.

 

 

### 00:45:15

   
**Chris:** But that could also come down to categorizations to exactly what you said like is this account because when you start getting like the grocery accounts it really needs to be unformed and then if they want to create their own hit  
**Ethan Brown:** Yeah.  
**Chris:** list that's where where the bulk uploader come kind of comes into to play or that kind  
**Ethan Brown:** Uh maybe the more realistic example is,  
**Chris:** of  
**Ethan Brown:** you know, um say you have a SAS client and they identify a new account that is is, you know, not on Hart's radar yet. And that seems like totally reasonable. It's like, hey, this isn't in the system. They have a way of they should I'm guessing they have a way of adding  
**Chris:** Yeah,  
**Ethan Brown:** that  
**Chris:** that that's what that's what I was going back into about being have the ability to add an account in. Yes. And you'll be able to add that into the system. How we reconcile that is going to be a pain in the ass because and I'm I'm trying to get I am there are ways of getting master data where we know like in the state of the state of New York they provide every single account that has a liquor license and we can download that and upload that and

 

 

### 00:46:22

   
**Ethan Brown:** It's probably everywhere, right? Like there is a I don't think there's anywhere in the US that you can't fly  
**Chris:** Yes.  
**Ethan Brown:** under the radar.  
**Chris:** No, but how easy they they make it for you to you to get at it is the differences. And New York, I was actually surprised at how easy because you can just download it straight and it shows in a spreadsheet view and you can download the entire thing. Um, but yes, all that is available from an alcohol perspective. when we start talking about other in in in uh industries that are not that don't need to basically say what what they too like like you said to perfume perfume is a good example because perfume is kind of another industry that's kind of near near us because they hire models and people people to to do that. So Macy's doesn't have to say we're into the US government. I sell perfume. These are all locations for perfume.  
**Ethan Brown:** Right.  
**Chris:** We at some point in time I don't think that'd be a later build for us to look at.

 

 

### 00:47:16

   
**Ethan Brown:** Right.  
**Chris:** Where this could be problematic is cannabis. So that's the only thing I see because cannabis is kind of a wild west right now. I don't know if that's public information, but having that being added in there and um that's why I say for maybe for beverage alcohol we lock it, but for the other industries in the future, future wise, but I think we do have need to have the conversation because my only fear is if we allow them to add an account in, what does that do to the master list? And are we now managing an an account list specific for each client on top of like a universal list? Because it should be  
**Ethan Brown:** Yeah, I I to me this sounds more like a a process problem than a  
**Chris:** universal.  
**Ethan Brown:** data problem. um you know with with the process challenge being when a client adds a new organiza a new client um sorry a new account what what do we do with that and it sounds like we just need some kind of reconciliation process and it it I I think this this problem will probably solve itself because I think what'll happen is as as clients s get onboarded and they add or work they add accounts that don't exist.

 

 

### 00:48:46

   
**Ethan Brown:** You know there there may be an influx when a new uh client comes on board and you know some more work for heart to uh reconcile those but as the database grows you know new new clients will find the data they already need there.  
**Chris:** And if and if we're updating from the master sources, which is the local government entities, everyone should be in there because they they do manage that pretty tightly and you cannot function unless you are registered with them. Um and you might fall the only times that might fall in and out is because of your status because if you go poorly in status, they may pull you from that list and it so I agree with you. It is a process part Ethan. Um having some sort of reconciliation might be a good good way of looking at it. But I think in the beginning we should just be cautious of how much you want to build this  
**Ethan Brown:** Thanks,  
**Chris:** out.  
**Joe Green:** Cheers Rafael. No.  
**Ethan Brown:** Raphael.  
**Chris:** See it.  
**Joe Green:** Yeah. Okay. I think that um that makes sense.

 

 

### 00:50:00

   
**Joe Green:** Again, obviously we said this a few times, but try and keep it as simple as we can for that initial pilot one. Um, and then we can build out some of these systems a bit later, particularly as we get, you know, some more data and understanding of how people are using things. Um, all right. So, yeah, I mean, that's um that's kind of what the main thing we want to go through today. Um, those discussion points. I know some of them still need some discussion, but we've narrowed it down. Um, and I can reach out to um, some of the SMMES that you mentioned. Um, I can tag them in here and and jump on a quick call with them if it's easier.  
**Chris:** Yeah,  
**Joe Green:** But to clear up those those final few  
**Chris:** I think I think the best best thing to do because they they're they're good with email.  
**Joe Green:** points.  
**Chris:** So, I think the best thing to do is when we're ready to have those discussions, Joe, shoot an email to those people.

 

 

### 00:50:47

   
**Joe Green:** Mhm.  
**Chris:** Always keep me involved, please. And just ask them when they could be available, and they'll they'll tell you.  
**Joe Green:** Mhm.  
**Chris:** And I I would just specify a day as to when you when you'd like to do it and just see where where they want to fall. And just note like for me every day between 10:30 and 11:30 I'm I'm not available. So just just keep that  
**Joe Green:** Okay.  
**Chris:** note.  
**Joe Green:** Yeah, morning's tough. Um, cool. So, yeah, I mean the final point then is I know um I think you talked about this a bit when we were away and uh I've been messaging a little bit about setting up this this session, but essentially like how do you see what's the best way to um Sorry, Ethan, do you want to uh touch on that point?  
**Ethan Brown:** No, go ahead. Yeah, finish it  
**Joe Green:** I was just going to ask as a as a next step um like what's the best way for you to  
**Ethan Brown:** up.  
**Joe Green:** essentially get this uh capabilities matrix like approved for the wider stakeholders?

 

 

### 00:51:45

   
**Joe Green:** You know,  
**Chris:** Oh, no, no, no.  
**Joe Green:** we've got a list now.  
**Chris:** This there's no approval. Like this is for us. This is this is meant for us to communicate as to what we've checked off,  
**Joe Green:** Okay.  
**Chris:** what we're working on currently, what's coming up.  
**Joe Green:** Okay.  
**Chris:** So in terms of priorities, like I still want to take these as like sprints in an agile form. So things move around, no problem. I don't think we have to hard code and say we're gonna do these things in this order.  
**Joe Green:** for  
**Chris:** But what I like like to do is like Thursdays I have my my leadership call.  
**Joe Green:** sure.  
**Chris:** Throw this up and say here's what we did this week. Here's what we're doing next week. And in that call, if I need to talk to Larry and Leah and say, "Hey, can you guys get on a call with with with AM Ambar tomorrow or today?" I can have that conversation. So, this just makes it easier kind of show because there's a lot of questions that come up,

 

 

### 00:52:30

   
**Joe Green:** Mhm.  
**Chris:** especially as we're looking at trying to talk to other other potential clients, when we're going to have all this stuff um and what what are we actually going to have? So having this in front of them on a weekly basis is  
**Joe Green:** Okay, cool. Yeah, that's clear. All right,  
**Chris:** important.  
**Joe Green:** Ethan.  
**Ethan Brown:** Um, I've been, uh, working on some slides for back lack of better words to try to wrap my head around, um, you know, sort of the big picture of what we're building and how it's going to morph into the future. Um, and I wanted to share that with you, Chris. I know this meeting is running really long. We could schedule another one. Um, I don't I don't know what your time Okay,  
**Chris:** Good. I'm good. Let's  
**Ethan Brown:** Joe, do you have a few minutes?  
**Joe Green:** Yeah,  
**Chris:** run.  
**Joe Green:** I can say I need to drop off in in about 10 minutes if that's all right. But um just before just before you do that,

 

 

### 00:53:23

   
**Ethan Brown:** Hopefully, it won't take the  
**Joe Green:** if that's okay, just a couple of small housekeeping bits. um hosting um we we're getting to a point where we need to set up the kind of infrastructure. So just staging at the at the moment I know the intention eventually will be that it'll be hosted on your production  
**Chris:** Okay.  
**Joe Green:** environment um on your side but for staging are you happy for us just to spin that up on our side there's like there'll be a small cost um for you guys to to handle the billing which we can send more details around but we can set up we'll just basically move forward set up a staging environment in our environment and then uh when it comes to production we can migrate things over  
**Chris:** or do we is it better for us just to to keep it clean? I know contractually, you know, it's not going to be it's going to be in our space. Um,  
**Joe Green:** Mhm.  
**Chris:** you know, I'm just telling you guys I'm not anticipating us breaking the continuing phases work like this is I'm happy with what you guys have been doing right now.

 

 

### 00:54:20

   
**Chris:** Everyone's happy at this point. Um, but is it better? I'm just thinking from a cost standpoint for us to to stand it up in our AWS or and you don't have to give me an answer answer today. Let me know what what do you think the estimate cost of that additional would be because then I have to run that by um run it run it by in terms terms of the project so people know.  
**Joe Green:** Yes. Um I have a note here to I think the initial estimate is  
**Chris:** Oh, and  
**Joe Green:** like $500. Um but I can follow up on email is probably the easiest way. Just jot everything down, make it clear as clear as day for you and then um we can make a call. It's not a blocker. It's just something we need to align on sooner rather than later so we can set up that environment.  
**Chris:** Okay.  
**Joe Green:** Cool.  
**Chris:** Okay.  
**Joe Green:** Um, and the other uh housekeeping bit was kind of a reminder that Lewis uh mentioned to me um earlier, but if you have any clarity or information on who the initial pilot clients are going to be, um I'm not I don't as I understand it,

 

 

### 00:55:18

   
**Chris:** Okay.  
**Joe Green:** that hasn't been um agreed yet, but if uh we get any information on that, that would be helpful as well, just to understand who and what and any information ahead of time that will be helpful.  
**Chris:** Um it might be stoli but that that's kind of kind of what the target is. Um I think for your needs taking for the information we currently have like the supplier information we have currently in in that's that's in hems right now the data and all the account information. pulling from that would help because we're not going to be doing necessarily any branding for them. Um, and they're going to be needing the account list. Um, items are their items. I believe their items are already in our system as well. So, it would be a good exercise for you guys to kind of just build the greater platforms master data and  
**Joe Green:** Okay.  
**Chris:** then we can pull from that from an organizational pull for that vertical for leap.  
**Joe Green:** Okay.  
**Chris:** Does that sound good?  
**Joe Green:** Cool. Yeah. Yeah. Yeah.

 

 

### 00:56:27

   
**Joe Green:** Yeah.  
**Chris:** Okay.  
**Joe Green:** Sounds good to me. Sorry, Ethan. Um, just wanted to make sure I covered those before I dropped off.  
**Chris:** Okay.  
**Ethan Brown:** Okay, I'm going to share my screen. Um, I'm going to present this like I know what I'm talking about, but really the the point is more uh Chris that you can validate that I know what I'm talking about. So, if anything's wrong, this is this is your opportunity to to correct my understanding. Okay. Um, this is my picture, my my mental understanding of Hart's current business model with respect to business entities. Um, I put revenue sources in green, cost centers in orange, and non-financial business relationships in blue. So, you have suppliers and distributors, that's where you're getting your money. You have your contract workforce, that's where you're spending your money, but you know, aside from internal employees, etc. And then, you know, with the the accounts, it's all about coordination and scheduling.  
**Chris:** Yes.  
**Ethan Brown:** Okay, good so far.  
**Chris:** Yes.  
**Ethan Brown:** Are there any major U entity, you know, business entity relationships I'm missing

 

 

### 00:57:41

   
**Chris:** So you could add another that that would be client that would be green and that would  
**Ethan Brown:** here.  
**Chris:** be this that SAS revenue.  
**Ethan Brown:** All right. We'll we'll get to that. That's where we're going next.  
**Chris:** But right now right now current business is is like this.  
**Ethan Brown:** Um Okay, great.  
**Chris:** Yes.  
**Ethan Brown:** Um, and then this is this is essentially what I'm calling the agency model. So, exact same picture. I have a funny slide here for that. This is what we're calling the agency model. So,  
**Chris:** Okay.  
**Ethan Brown:** there are other agencies like heart that operate in the same fashion and that's  
**Chris:** Yes.  
**Ethan Brown:** who we're trying to serve, right? Okay. Um, so this is sort of,  
**Chris:** Yeah.  
**Ethan Brown:** you know, what we're expecting HART to look like in phase two. Um, you know, after after we get through the trial and we've validated all this works, um, HART is now, you know, really collecting self-revenue and, you know, from accounting perspective, who cares if you, you know, the heart agency charges hard, doesn't really matter.

 

 

### 00:58:50

   
**Ethan Brown:** That's an accounting question. Um, but now you're getting SAS subscription revenue from these other organizations, all of which look like an agency. They look like hearts. Okay.  
**Chris:** Correct.  
**Ethan Brown:** Now, from a functionality perspective, and this is something I I I think I'm understanding now, but I want to confirm for sure. If you have suppliers or distributors using the heart system, my understanding is they're not getting, you know, different functionality. They're just using um HIMS as as an agency. We're accessing the information within it, but we're not providing any additional in uh functionality that's specific to a supplier or a distributor. They're going to be an agency from all from all intents and  
**Chris:** Yes,  
**Ethan Brown:** purposes.  
**Chris:** because the the competency the compet competency if you look at hems stands for a heart event management system. So it's event management. So so from a standpoint yes they're all acting as a pseudo agency would because they're managing their their events.  
**Ethan Brown:** Okay,  
**Chris:** Yes.  
**Ethan Brown:** great. Um, okay. So, down the road, same picture except now we're adding the data institute client.

 

 

### 01:00:11

   
**Ethan Brown:** Okay, good. And now we can start thinking about him. So really this is just HIMS. I I did have a little confusion. You know, you made that comment about nomenclature. We're building HIMS 2.0 and and what you have now you're calling him 1 1.0 or 1.x.  
**Chris:** So I I can clarify that and I knew that was going to come up.  
**Ethan Brown:** No.  
**Chris:** So that's absolutely fine. Um I have a slide I can share with you. So when you give when you get done with this I can kind of show you how how this works.  
**Ethan Brown:** Okay.  
**Chris:** This this is just so internal for us is is hems 2.0. External is is those those four other verticals.  
**Ethan Brown:** Okay.  
**Chris:** What you guys are building at the the base level is the platform that we can create these verticals off of.  
**Ethan Brown:** Yeah. Okay. Um qu small push back on this name. Um, like he platform sounds great, but then if you expand that acronym, you get system platform, which to me is a little weird, you know, but I'll I'll leave that for your marketing folks to think

 

 

### 01:01:20

   
**Chris:** This has been an ongoing battle.  
**Ethan Brown:** about.  
**Chris:** Ethan, do not bring that up,  
**Ethan Brown:** Okay,  
**Chris:** please.  
**Ethan Brown:** I I won't that we're fine with him platform. Maybe the acronym will eventually, you know, become not an acronym. Okay. Um so this is uh sort of moving to uh authentication and um this slide looks a little bit confusing at first but I I think uh it's it's actually relatively simple. So what we're calling an operator this is a person this is a heart person that essentially has cart launch access to everything.  
**Chris:** and Joe. Thank you, ma'am.  
**Ethan Brown:** Thanks Joe. Um so the heart operator has access to everything you know you obviously are operator there will other be other other people at heart who are operators they can access everything. I put uh asterisks next to the you know the pointers into the organizations because we could say and you know I would support this from from a authorization perspective that by default an operator just has readonly access into these organizations and maybe they have a way of escalating their own um privileges if they want to actually make changes in an organization but for the most part you know uh like we want to prevent accidental changes like a hard operator goes into an org and changes something accidentally not realizing there there should be like a elevated way to do that is my guess we can work out

 

 

### 01:02:57

   
**Chris:** Okay.  
**Ethan Brown:** those details later um uh then we have org members and though  
**Chris:** The  
**Ethan Brown:** those will also have levels so you'll have an org admin etc um  
**Chris:** what what is the blue?  
**Ethan Brown:** a  
**Chris:** So what is the heart in here? Is that that the what was before hardcore or now it's now  
**Ethan Brown:** This is if this is just a hard as a agency  
**Chris:** it's so that's okay.  
**Ethan Brown:** clients.  
**Chris:** So then that's that's hems  
**Ethan Brown:** Yeah. Uh yes,  
**Chris:** 2.0.  
**Ethan Brown:** Ann. Uh that that brings me to another question about HIMS 2.0. When you say HIMS 2.0, are you referring to Thank you.  
**Chris:** Let me share my screen. Let me share my screen. And this this should help. So, um, and I and trust me, Ethan, I knew we would we it would be good to go through this one more time. That's just over a Slack message, so don't worry. Okay. So, this is meant to be what Hems is today. It's single app, web app, processes, and the two mobile apps.

 

 

### 01:04:09

   
**Chris:** This is current what you guys Come on. So what we're building next is the platform Nestle and and then these four verticals off of that platform and I made it very clear to leadership that the platform is a thing but each of the these are a product that are their  
**Ethan Brown:** All  
**Chris:** own thing that are based on the platform because because there's things that to unify it but each one of these products is different in terms of who the users are what the use cases is what the functionality is and the purpose of them are. So Hems 2.0 replaces the current my hems as the next phase that we  
**Ethan Brown:** right.  
**Chris:** utilize internally to run our business in the state of in the state of New York constantly. Hems customer is that that pinata competitor SAS product that that suppliers and distributors can can sign up with and they get basically hemps 2.0 for them essentially.  
**Ethan Brown:** Right. Okay.  
**Chris:** Then hems affiliate is those affiliates third party and then data institute is syndicated data enterprise clients.  
**Ethan Brown:** Okay. So, him's customer.

 

 

### 01:05:24

   
**Ethan Brown:** So, HART, HIMS customers, and HIMS affiliates are all essentially getting HIMS 2.0, you know, from a like this is the software perspective. We just sort of we think about them differently in terms of who the who the customer actually is.  
**Chris:** Correct.  
**Ethan Brown:** Yeah. Okay, that's clear,  
**Chris:** And the Hems customer is what you guys are are building as as the first vertical off the  
**Ethan Brown:** right?  
**Chris:** platform.  
**Ethan Brown:** Okay, good. Um All right. So, uh, back back to the back to my slide.  
**Chris:** Sure.  
**Ethan Brown:** Okay, I can wrap up here quickly. Um, so a couple things I just wanted to validate with you. Um, you know, I I modeled these as badges because these are really roles. So, I want to separate the concept of a role from from a person. A person has a role, but the role is really what gives them access to the the functionality or the data. So uh you know Jane client is a person she has an org member role uh  
**Chris:** Right.

 

 

### 01:06:29

   
**Ethan Brown:** say for hearts so she's a heart employee she can access him 2.0 know as a heart employee um she can't necessarily see other organizations because she's not an operator. She doesn't have the operator role.  
**Chris:** But she but she's she's over that one single org that's that's in there.  
**Ethan Brown:** Um  
**Chris:** And and that's why I was saying those orgs basically fall under that hem's  
**Ethan Brown:** right.  
**Chris:** customer.  
**Ethan Brown:** Yes.  
**Chris:** So So each one one of those individual orgs would would be a Hems customer that that had has their their their standup  
**Ethan Brown:** Okay. And then I don't I don't Sorry. Go  
**Chris:** So, so like the third thing that that would be in here would be a green green slashblue  
**Ethan Brown:** ahead.  
**Chris:** because it could be something that that we could access and something we do drive revenue off of is that hem's affiliate and that is something that we could have access to theirs. They could have and they they could have access to the network in some form or  
**Ethan Brown:** Okay. So,  
**Chris:** fashion.

 

 

### 01:07:38

   
**Ethan Brown:** I I really think this is all the same thing from a system perspective.  
**Chris:** I'm not sure Ethan for for one reason.  
**Ethan Brown:** Okay.  
**Chris:** Under under the client under the the hems customer they're basically autonomous. It's here's your software, you guys manage your business, you're good. Under the affiliate, you've got the network.  
**Ethan Brown:** Right.  
**Chris:** So stolen may come to us and say we forget stoleie card may come to us and say we love what you do in New York. Can you do Texas? Yes.  
**Ethan Brown:** Yeah.  
**Chris:** So we would be pushing the campaigns to the affiliate in Texas and they would be able to roll up and see how things are going nationally, be able to communicate as well in some form form or fashion. But essentially, yes, we're we're in control of it, but there's some feedback as well because now the affiliate is filling information back back out and and instead of it staying in that org for the customer, it's now coming back to us and and being rolled up nationally.  
**Ethan Brown:** Okay. So, let me try to draw that picture.

 

 

### 01:08:49

   
**Ethan Brown:** Uh, Joe affiliate. So, here we have a person Joe affiliate.  
**Chris:** That's perfect because Joe's in charge of affiliates.  
**Ethan Brown:** Um,  
**Chris:** So that's perfect.  
**Ethan Brown:** um, turn this around. So Joe can access um an affiliate organization, but what's unique about an affiliate is we will probably also have HART employees that have access to that to help manage that  
**Chris:** Correct. Correct.  
**Ethan Brown:** account.  
**Chris:** And the other important thing is there's it'll have linkage to Hems 2.0. So the and and also from a product standpoint, which we'll get into that in phase two, phase three, they may not have access to the full Hems Hems product. They may only have kind of inhering different levels. This may be just a push relationship where we're pushing events. They get access to the mobile app. We roll them up. or it might be a push and a pull where they're able they're able to manage a full environment and we can push events to them. So then that's there's that differentiation. That's why I'm saying it doesn't fall underneath the same Oregon way you have here.

 

 

### 01:10:08

   
**Chris:** I wouldn't group it with the the Hems customer because it's not the same product and the the way that that we're handling the data is different as well because essentially what we're saying is the event information that they are they are doing is going back into Hems 2.0 and we're able to then roll up that campaign nationally whereas in a Hems customer we wouldn't necessarily be doing that. It's their their tool. We we we would probably be leveraging some of the things that they do for the accounts where we could say we're we're taking the pictures and some some of the survey results, the general survey results. Um but that still needs to be worked out. But the relationship is is different  
**Ethan Brown:** Okay. So, um, and I'll I'll clean these these slides up later,  
**Chris:** though.  
**Ethan Brown:** but this is basically the idea. So, Jane is a hard employee. She is an org member of an affiliate because she she essentially administers that on behalf of or in support of and then you have an affiliate who has access to the system, you know, with the support of card employees.

 

 

### 01:11:16

   
**Ethan Brown:** Okay,  
**Chris:** Correct.  
**Ethan Brown:** great. Um okay. And then um thinking big picture for me it is there's no fundamental reason that a person can't have multiple roles on multiple organizations. you know, maybe there's, you know, business rules or or whatever, but it's feasible that you could have a person that is both a data institute client and uh a customer or affiliate  
**Chris:** You could um my initial thoughts on the data. Yes, you could. The the data institute and Stephanie brought this up. The data institute is really that client would be they're just there for the data necessarily. they're not there for for the platform and such.  
**Ethan Brown:** Wait.  
**Chris:** So if they have if they are a Hems customer or they are Hems affiliate getting access to their data being API. Yes.  
**Ethan Brown:** Yeah.  
**Chris:** Like that's fine. The data institute would be an addition additional on that.  
**Ethan Brown:** Okay.  
**Chris:** So I agree with you. They could be a data institute client and they could also be a hemp customer as  
**Ethan Brown:** Okay.

 

 

### 01:12:26

   
**Chris:** well.  
**Ethan Brown:** Um, great. I I think that's all pretty clear. And, you know, from a system design perspective, you know, for me, it's all about who who we're handing these badges out to. So, an operator badge has cart blanch access. An org member only has access to a specific org. Um, and a data institute member has access to the data institute platform.  
**Chris:** You  
**Ethan Brown:** And who we give those badges to is is up to you know art and and you know the way users are registered and assigned to the system.  
**Chris:** might want to then have considerations of the product and then or like if we're talking about like say a hard employee and they're not an operator but they are say the the um lead the lead administrator for Hems 2.0 then they don't need to be an operator and they don't need to have access to the orgs but they should have you know  
**Ethan Brown:** Okay, that that that's a great point. So that's that's one of the reasons I put these little asterisks here on the CAN access.

 

 

### 01:13:25

   
**Ethan Brown:** So I I still um want to look at I still want to uh reserve the term operator for someone who can administer the HIMS platform and there there might be gradations of access in in that operator status. So you know an operator data administrator for example might be able to update products but they wouldn't by default have access to organizations or you know so so we can we can add gradations to that. Um I but I think that that works. Okay. Um fantastic. I'm going to uh I'm going to keep this as my mental model for the way um access works in the multi-tenant system and is the the discussion of affiliates is very helpful. So um so thank you for that.  
**Chris:** No problem.  
**Ethan Brown:** Okay. Um I think that's all I got for  
**Chris:** Okay.  
**Ethan Brown:** now.  
**Chris:** I shared the picture from the deck into the Slack with everybody so that you guys can can see  
**Ethan Brown:** Perfect.  
**Chris:** that. Um hopefully that that'll just be this just a reminder and then I can do some simple orb verticals hierarchies to help you guys out as to what what these would would look like.

 

 

### 01:14:36

   
**Chris:** So as we start talking about the data we can you guys have something to corral around.  
**Ethan Brown:** Yeah,  
**Chris:** Um anything else at this point?  
**Ethan Brown:** I don't think  
**Chris:** Cool.  
**Ethan Brown:** so.  
**Chris:** I appreciate the the the attention to detail Ethan and I have no problems with you going it over over again and this visual does help. You're talking about user management which I have not even thought about. I'm glad you're thinking about it now  
**Ethan Brown:** Okay.  
**Chris:** too.  
**Ethan Brown:** All right. Uh well, thanks for your time and uh it looks like I'll see you on Thursday. Is that our next Yeah.  
**Chris:** I don't did we have it for Thursday already?  
**Ethan Brown:** Uh we uh Oh, sorry. No, that's a internal internal one. Um yeah. So, unless something else gets scheduled, I'll see you next week.  
**Chris:** get get back to well get back to me if we have a demo release or any releases let me know because I want to make sure we include Steph just to see where we're at with that and and  
**Ethan Brown:** Yep.  
**Chris:** um on the matrix part that we shared with is that good for me to look in and pull for tomorrow's morning meeting and do we are you  
**Ethan Brown:** Yeah. Absolutely.  
**Chris:** highlight highlight  
**Ethan Brown:** Okay. Okay.

 

 

### Transcription ended after 01:15:58

_This editable transcript was computer generated and might contain errors. People can also change the text after it was created._

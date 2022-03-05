![Hackathon Logo](docs/images/hackathon.png?raw=true "Hackathon Logo")
# Sitecore Hackathon 2022

- MUST READ: **[Submission requirements](SUBMISSION_REQUIREMENTS.md)**
- [Entry form template](ENTRYFORM.md)
- [Starter kit instructions](STARTERKIT_INSTRUCTIONS.md)
  

# Hackathon Submission Entry form

You can find a very good reference to Github flavoured markdown reference in [this cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet). If you want something a bit more WYSIWYG for editing then could use [StackEdit](https://stackedit.io/app) which provides a more user friendly interface for generating the Markdown code. Those of you who are [VS Code fans](https://code.visualstudio.com/docs/languages/markdown#_markdown-preview) can edit/preview directly in that interface too.

## Team name
⟹ Hardcore Sitecore

## Category
1.	Build an e-commerce Minimum Viable Product to sell community t-shirts 
-	The submission must include the following technologies: 
  -	Sitecore XM - Rendering host (.net or jss) 
  -	Sitecore Send 
  -	Sitecore Order Cloud 
-	Authentication is not required 
-	Payment processing is not required 


## Description

Our team created a site leverages the latest and greatest Sitecore experience management and eCommerce tools to rapidly create an MVP Sitecore eCommerce website. 

By leveraging the power of Sitecore XM and Sitecore Order Cloud we were able to rapidly build an eCommerce site that:
- Combines the power of Sitecore XM Editor with the ease of Sitecore OrderCloud.
- Allows authors to manage web content in Sitecore with Content Editor or Experience Editor.
- Enables authors to manage test data through a copy of the Vercel Commerce marketplace hosted in the OrderCloud Portal. 
- Uses DOTNET New to rapidly create a containerized JSS solution.
- Employs a boilerplate Helix design to build easy to maintain code and content.
- Uses Sitecore Content Serialization to manage content updates.
- Uses Sitecore Headless JSS to render a basic eCommerce site with cached client-side content
- Leverages the NextJS OrderCloud starter kit to rapidly create a site integrated with a marketplace hosted in OrderCloud IO.
- Converts the product detail rendering from the starter kit to a Sitecore rendering, so we can leverage the Sitecore Experience Editor to edit the product detail page and enhance the product detail page with easy to implement custom Sitecore components. We place Sitecore components on the resulting product detail page, suorrounding the OrderCloud product detail markup to demonstrate how commerce and Sitecore content can be mixed in this solution.
- Uses a custom NextJS app hosted in Vercel to pull dynamic content from Sitecore XM Layout Service into our headless pages.
- Once we have a list of product IDs, our headless pages call out to Order Cloud to retrieve and render dynamic product data.
- Integrates with Sitecore Send to manage email subscriptions for our eCommerce site, and allows users to place email subscriptions on a page as a Sitecore component.

  - Module Purpose
  - This module proves that is possible to quickly assemble a working eCommerce site using the latest Sitecore tools.
    - We integratate Sitecore XM with OrderCloud providing a functional MVP eCommerce site, and used the NextJS OrderCloud startup kit to accelerate implementation of our solution.

## Video link
⟹ Provide a video highlighing your Hackathon module submission and provide a link to the video. You can use any video hosting, file share or even upload the video to this repository. _Just remember to update the link below_

⟹ [Replace this Video link](#video-link)

## Pre-requisites and Dependencies

⟹ Does your module rely on other Sitecore modules or frameworks?

- Our module uses the Docker images in the Hackathon toolkit.
- We use a shared OrderCloud marketplace hosted in OrderCloud.io.


- Or other modules that must be installed
- Or services that must be enabled/configured

_Remove this subsection if your entry does not have any prerequisites other than Sitecore_

## Installation instructions

1. Pull down the main branch of the Hardcore Sitecore.
2. Open Powershell as an administratora and run ./start-hackathon.ps1.
3. Once all containers are up, sync the Sitecore configuration by running dotnet sitecore ser push
4. Open the Hardcore.sln and rebuild the solution.
5. Open Sitecore by accessing https://cm.hardcore.localhost/sitecore with credentials admin/b
6. Publish the site.
7. Visit the storefront at https://www.hardcore.localhost

### Configuration
No custom configuration is required. Our solution runs layered over the docker images included in the Hackathon solution.

## Usage instructions
Our website extends the HeadStart Next JS base site and provides basic eCommerece functionality. Here are a few interesting points to note:
- Our solution allows users to leverage Sitecore XM Experience Editor. For an example, you can launch /sitecore/content/hardcore/home in Experience Editor and edit the content on the page.
- To view a product detail page, visit the storefront at https://www.hardcore.localhost/products/short-sleeve-t-shirt. Note that this page is produced by a Sitecore rendering that interleves Sitecore content with product contact pulled from order cloud. The page itself is servered statically from Vercel, and dynmaic information is pulled in from Sitecore Layout Service and Order Cloud. Note that since this is a Sitecore rendering, you can actually edit the product detil page in Experience Editor.
- On the homepage at https://www.hardcore.localhost we have an email subcription interface that integrates with Sitecore Send.

Include screenshots where necessary. You can add images to the `./images` folder and then link to them from your documentation:

![Hackathon Logo](docs/images/hackathon.png?raw=true "Hackathon Logo")

You can embed images of different formats too:

![Deal With It](docs/images/deal-with-it.gif?raw=true "Deal With It")

And you can embed external images too:

![Random](https://thiscatdoesnotexist.com/)

## Comments
If you'd like to make additional comments that is important for your module entry.

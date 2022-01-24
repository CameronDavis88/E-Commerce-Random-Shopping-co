# Random Shopping Co. E-Commerce Project
### [Live-Website]: (https://random-shopping-co.netlify.app/)

## Description:
This is a demo/practice E-Commerce website. The Home view displays products for mock sale which user can add to their cart. When ready to view their cart the user can click the shopping cart icon-button in the navbar--which also displays the numbers of items in cart. The cart view displays the items in the cart and allows the user to increase or decrease the number of each product therein or remove it entirely, empty cart of all its contents, or continue to checkout. The Checkout views first require the user's personal shipping information and then their credit/debit card information, then completes the transaction upon the user's click of the pay button. Upon completion of transaction a confirmation page is displayed which thanks the user for their purchase and displays a button which allows them to return to the home page.

## Technologies Employed:
React (including functional components, hooks, and hook-forms) was used to create the core of the application.
Material-ui was used in much of the layout and appearance--including useStyles with style.js files.
Commerce.js was used for as the backend of the project and held the information of the products and shipping options.
Stripe was employed for the payment transaction portion.


## My Experience:
I created this app following the instructions of a YouTube video. Due to instructor's video and code being relatively old, and a few other reasons I am still not sure of, I had to debug and improvise a significant amount. It was necessary for me to consult the documentation for material-ui, react-hook-forms, commerce.js, and stripe much more than relying on the video. I was stuck for a long time on the last step. The error message kept telling me that there was an error in the payment.gateway (that the gateway with ID "stripe" was not found) but my code followed Commerce.js' documentation perfectly. I made sure that all was set with stripe and that I had set up the gateway on Commerce.js with stripe. I finally realized that stripe on that gateway was live and not set to sandbox mode, and as soon as I changed that it worked. I am not one to say cliche pleasantries, but I have to say that this project really was a huge learning experience! Having no tutor (except the pre-recorded tutorial), and having many of the issues not being directly discussed in any forums I could find, I had to think and work through the bugs myself--which experience gave me a profounder understanding of the concepts and patterns involved. 


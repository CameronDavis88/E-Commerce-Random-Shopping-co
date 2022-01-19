# Random Shopping Co. E-Commerce Project
### [Live-Website]: (<!-- url to hosted website  -->)

## Description:
This is a demo/practice E-Commerce website. The Home view displays products for mock sale which user can add to their cart. When ready to view their cart the user can click the shopping cart icon-button in the navbar--which also displays the numbers of items in cart. The cart view displays the items in the cart and allows the user to increase or decrease the number of each product therein or remove it entirely, empty cart of all its contents, or continue to checkout. The Checkout views first require the user's personal shipping information and then their credit/debit card information, then completes the transaction upon the user's click of the pay button. Upon completion of transaction a confirmation page is displayed which thanks the user for their purchase and displays a button which allows them to return to the home page.

## Technologies Employed:
React (including functional components, hooks, and hook-forms) was used to create the core of the application.
Material-ui was used in much of the layout and appearance--including useStyles with style.js files.
Commerce.js was used for as the backend of the project and held the information of the products and shipping options.
Stripe was employed for the payment transaction portion.


## My Experience:
I created this app following the instructions of a YouTube video. Due to instructor's video and code being relatively old, and a few other reasons I am still not sure of, I had to debug and improvise a significant amount. It was necessary for me to consult the documentation for material-ui, react-hook-forms, commerce.js, and stripe much more than relying on the video. I am not one to say cliche pleasantries, but I have to say it really was a huge learning experience! Having no tutor, but the pre-recorded tutorial, and many of the issues not being directly discussed in any forums I could find, I had to think and work through the bugs myself--which experience gave me a profounder understanding of the concepts and patterns involved.  

## Remaining Bugs...
After already investing too much time into this one simple project I still was unable get the final payment step to completely work: linking stripe and commerce.js in the form to send the order. The error states:" pay_what_you_want: "Pay what you want" amount is invalid " (thus the order not being created) but the value is exactly what the documentation calls for. I programmed the final step to still send the user through to the confirmation page anyway, which also clears the cart and sends a error message that the cart is now empty, which is expected. I am going to just create another project from scratch, not following anyone else at all, that is not as large and as styled to specifically practice the final step of the stripe card transaction and commerce.js capture method.

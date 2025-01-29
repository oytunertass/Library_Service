Oytun Ertas 42208
Mustafa Sekizkardes 41500
Berkay Celik 40467
Aysegul Akyuz 42240


USING LINK: https://libraryv2.vercel.app/


LIBRARY SERVICE SYSTEM
Functional Requirements:
● User Registration: System should allow users to register for the library services,
Authentication.
● Booking System: It must be a system that let you reserve books, study rooms, and
specific material (manage availability)
● QR/ RFID system in the books so people can take them with no need of library
employees.
● Check-in and check-out : Users can borrow items, and library staff can process returns
● Catalog search: Book catalog that users can check available books.(filter, and research
options)
● Language options
● Penalization System: System should check borrow time for each item and see if they
exceed our borrow policy.
● Late notice: The system should send email reminders for overdue books
● System Memory: System remember user preferences and able to recommend books
based on user preferences(holds maximum 100 books for each user)
● Notification: Email notifications should be sent promptly
Non-Functional Requirements:
● Speed: The system should respond quickly to users actions( max 1 second).
● Scalability: it must be able to scale to accommodate new users.
● Security: User data and book information should be kept secure.
● Integrity: Data users should be managed according to law statements.
● Usability: The system must be easy to use for the users no matter which profile this user
has (disability, elders, kids…) Intuitive interface for employees and users.
● Collaboration : cooperate with other programs and resources.
● Availability: users could reach as much as possible(%99).


Diagrams can be found in repository



DESIGN PATTERN: MVC METHOD 
M (Model): Oriented to data (management, storage, operations…) and business logic. Works with the data. 
    Book info. 
    Available book info. 
    User details. 
    Borrowing info. 
    Book addition/extraction. 
    Manage time to return a book. 
    Season´s books (time) recommendations. 
V (View): Represents the interface of the application and gives the data to the user in a comprehensible and visual way, basically it is responsible for presenting information provided by the Model and interacting with the user. 
    User info. 
    Notifications. 
    Page-like look. 
    Basic buttons on the main page. 
    Old people friendly. 
    Show new arrivals, books available. 
    Catalog search. 
    Checking out. 
    Returning books (QR). 
    Viewing due dates, and more. 
    C (Controller): The Controller serves as an intermediary between the Model and the View. It receives user requests through the View, processes these requests, and performs the necessary operations on the Model. (2 directions; when one changes the other too). 
    Get request of borrow, check availability, accept/reject request. 
    Get request to return, accept request, change books availability status. 
    Get request to change personal info, send notification to users phone or e-mail to approve, if get approve change info otherwise leave as it is. 
    Get request to search a book, search it in the database, print results. 
    Get request to addition/extraction of a book, update database. 

Architectural pattern: Component-Based Architecture 

Component-Based Architecture is an approach to software development that involves building systems by integrating pre-existing and new software components. These components are self-contained, modular units of functionality with defined interfaces for communication.
This architecture emphasizes the separation of concerns in software design, making systems easier to manage, develop, and scale. It aligns well with the principles of modularity, reusability, and maintainability. 

    Components 
BookCard Component: 
Shows basic book info with a "Details" button. 
Handles the logic for showing book details. 
BookDetails Component: 
Displays detailed book info and availability. 
Has a "Rent" or "Return" button based on availability. 
Manages the logic for renting or returning a book. 
SearchBar Component: 
Allows users to search books by name. 
Updates displayed books based on search input. 
   Component Hierarchy: 
LibraryApp Component: 
Main parent component. 
Manages the book list and search input state. 
Renders SearchBar and a list of BookCard components. 
BookCard Component: 
Child of LibraryApp. 
Displays basic book info and "Details" button. 
Manages the logic for showing book details. 
BookDetails Component: 
Displays detailed book info and availability. 
Manages the logic for renting or returning a book. 
SearchBar Component: 
Manages search input and updates displayed books. 
    Responsibilities 
BookCard Component: 
Shows basic book info and handles detailed logic. 
BookDetails Component: 
Displays detailed book info and manages rent/return logic. 
SearchBar Component: 
Handles search input and updates displayed books. 
    Props and State: 
LibraryApp Component: 
Manages book list and search input state. 
BookCard Component: 
Receives book info as props. 
BookDetails Component: 
Receives detailed book info and availability as props. 
SearchBar Component: 
Receives and updates search input as props. 
    Reusability: 
BookCard Component: 
Can be reused for each book in the library. 
BookDetails Component: 
Can be reused for each book's details view. 
SearchBar Component: 
Can be reused in different parts of the application. 

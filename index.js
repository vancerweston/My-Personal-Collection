const mongoose = require('mongoose');
const moment = require('moment');
const Book = require('./models/book');

console.log('<<-- Initiating Mongoose Test -->>');

let connectiong_string = 'mongodb://127.0.0.1:27017/my_personal_library?retryWrites=true&w=majority';

mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);

mongoose.connect(connectiong_string)
    .then(() => {
        console.log('<<-- The MongoDB connection was successful -->>');

        create_library().then(
            sort_books
        ).then(
            update_book
        ).then(
            delete_fake_book
        );
        // sort_books();
        // update_book();
        // delete_fake_book();

    })
    .catch((err) => {
        console.log('ERROR: ', err);
    });

function create_library() {
    console.log('<<-- Creating books for library -->>');

    const book_one = new Book({
        title: 'The Ruins of Gorlan',
        author: 'John Flanagan',
        series_title: 'Ranger\'s Apprentice',
        series_number: 1,
        publish_date: '2005-06-16',
        genre: 'Fiction'
    });
    const book_two = new Book({
        title: 'The Burning Bridge',
        author: 'John Flanagan',
        series_title: 'Ranger\'s Apprentice',
        series_number: 1,
        publish_date: '2007-06-26',
        genre: 'Fiction'
    });
    const book_three = new Book({
        title: 'The Lightning Theif',
        author: 'Rick Riordan',
        series_title: 'Percy Jackson & The Olympians',
        series_number: 1,
        publish_date: '2005-07-01',
        genre: 'Fiction'
    });
    const book_four = new Book({
        title: 'The Sea of Carrots',
        //The title should be 'The Sea of Monsters'
        author: 'Rick Riordan',
        series_title: 'Percy Jackson & The Olympians',
        series_number: 1,
        publish_date: '2006-04-01',
        genre: 'Fiction'
    });
    // This next book is fake
    const book_five = new Book({
        title: 'The Great Fake Scandle',
        author: 'Christofer Columbus',
        publish_date: '1492-10-11',
        genre: 'Nonfiction'
    });

    let save_promise_one = book_one.save();
    console.log('Is a Promise: ' + (save_promise_one instanceof Promise));
    save_promise_one
        .then((saved_book) => {
                console.log('ID: ' + saved_book._id);
                console.log(saved_book);
            }
        )
        .catch((err) => {
            console.log('Error: ', err);
        });
    let save_promise_two = book_two.save();
    console.log('Is a Promise: ' + (save_promise_two instanceof Promise));
    save_promise_two
        .then((saved_book) => {
                console.log('ID: ' + saved_book._id);
                console.log(saved_book);
            }
        )
        .catch((err) => {
            console.log('Error: ', err);
        });
    let save_promise_three = book_three.save();
    console.log('Is a Promise: ' + (save_promise_three instanceof Promise));
    save_promise_three
        .then((saved_book) => {
                console.log('ID: ' + saved_book._id);
                console.log(saved_book);
            }
        )
        .catch((err) => {
            console.log('Error: ', err);
        });
    let save_promise_four = book_four.save();
    console.log('Is a Promise: ' + (save_promise_four instanceof Promise));
    save_promise_four
        .then((saved_book) => {
                console.log('ID: ' + saved_book._id);
                console.log(saved_book);
            }
        )
        .catch((err) => {
            console.log('Error: ', err);
        });
    let save_promise_five = book_five.save();
    console.log('Is a Promise: ' + (save_promise_five instanceof Promise));
    save_promise_five
        .then((saved_book) => {
                console.log('ID: ' + saved_book._id);
                console.log(saved_book);
            }
        )
        .catch((err) => {
            console.log('Error: ', err);
        });
    
    return Promise.all([save_promise_one, save_promise_two, save_promise_three, save_promise_four, save_promise_five]);
}

function sort_books() {
    console.log('<<-- Sorting Books -->>');

    let books_query_one = Book.find({});
    books_query_one.sort({title: 1});
    let find_promise_one = books_query_one.exec();
    find_promise_one
        .then((books) => {
            console.log('<<-- Sorting by Title, Ascending -->>');

            books.forEach((book) => console.log(book.title + ' ' + book.author));
        })
        .catch((err) => {
            console.log('Error: ', err);
        });
    let books_query_two = Book.find({});
    books_query_two.sort({author: 1})
    let find_promise_two = books_query_two.exec();
    find_promise_two
        .then((books) => {
            console.log('<<-- Sorting by Author, Ascending -->>');

            books.forEach((book) => console.log(book.title + ' ' + book.author));
        })
        .catch((err) => {
            console.log('Error: ', err);
        });

    return Promise.all([find_promise_one, find_promise_two]);
}

function update_book() {
    console.log('<<-- Updating mistyped title for book -->>');

    let book_title = 'The Sea of Carrots';

    Book.findOneAndUpdate(
            { title: book_title },
            { title: 'The Sea of Monsters' },
            { new: true }, 
            (err, updated_book) => {
                if(err){
                    return console.log('Error: ', err);
                }
    
                console.log(updated_book);
                return Promise.resolve();
            });
}

function delete_fake_book() {
    let book_title = 'The Great Fake Scandle';

    let delete_promise = Book.findOneAndDelete({title: book_title}).exec();
    delete_promise 
        .then((book) => {
            console.log('<<-- Deleted Fake Book -->>', book.title);
        })
        .catch((err) => {
            console.log('ERROR: ', err);
        });
    return delete_promise;
}
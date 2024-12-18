import random
from faker import Faker
from pymongo import MongoClient

# MongoDB'ye bağlan
def db_connect():
    client = MongoClient("mongodb+srv://library:IhdvhLm7asJeXrli@libraryv2.dv5pp.mongodb.net/?retryWrites=true&w=majority")  # MongoDB URI'nizi buraya yazın
    db = client['test']  # Veritabanı adı
    return db

# Rastgele kitap verileri oluştur
def generate_random_books(num_books=10):
    fake = Faker()
    categories = [ 'Fiction', 'History', 'Science', 'Technology', 'Non-Fiction']

    books = []
    for _ in range(num_books):
        book = {
     "title": fake.sentence(nb_words=random.randint(3, 5)).rstrip('.'),
        "author": fake.name(),
        "description": fake.text(max_nb_chars=200),
        "category": random.choice(categories),
        "publishedYear": random.randint(1900, 2024),
        "isbn": fake.isbn13(),
        "isAvailable": random.choice([True, False]),
            "image": fake.image_url() ,
        "status": True,
        "borrowedBy": None,
        "borrowedDate": None,
        "updatedAt": fake.date_time_this_year(),
        }
        books.append(book)
    return books

# Kitapları MongoDB'ye yükle
def load_books(num_books=10):
    db = db_connect()
    collection = db['books']  # Koleksiyon adı

    # Rastgele kitap verilerini oluştur
    books = generate_random_books(num_books)

    # Kitapları MongoDB'ye ekle
    collection.insert_many(books)
    print(f"{num_books} books added successfully.")

# Ana fonksiyon
if __name__ == "__main__":
    load_books(10)  # Burada 10 rastgele kitap verisi oluşturulacak

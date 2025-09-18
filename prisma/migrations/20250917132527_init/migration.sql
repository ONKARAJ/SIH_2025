/*
  Warnings:

  - You are about to drop the column `price` on the `flights` table. All the data in the column will be lost.
  - You are about to drop the column `guests` on the `hotel_bookings` table. All the data in the column will be lost.
  - Added the required column `baseAmount` to the `flight_bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `arrivalDate` to the `flights` table without a default value. This is not possible if the table is not empty.
  - Added the required column `basePrice` to the `flights` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departureDate` to the `flights` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bookingRef` to the `hotel_bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nights` to the `hotel_bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomPrice` to the `hotel_bookings` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "hotel_reviews" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "hotelId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 5,
    "title" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "guestName" TEXT NOT NULL,
    "guestEmail" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "hotel_reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "hotel_reviews_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotels" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "payments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "bookingId" TEXT NOT NULL,
    "bookingType" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "paymentGateway" TEXT NOT NULL,
    "paymentId" TEXT,
    "orderId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "paymentMethod" TEXT,
    "transactionId" TEXT,
    "failureReason" TEXT,
    "refundAmount" REAL DEFAULT 0,
    "refundStatus" TEXT,
    "metadata" TEXT DEFAULT '{}',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "room_availability" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "roomId" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "available" INTEGER NOT NULL DEFAULT 1,
    "price" REAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "room_availability_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "room_inventory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "roomId" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "totalRooms" INTEGER NOT NULL DEFAULT 1,
    "bookedRooms" INTEGER NOT NULL DEFAULT 0,
    "blockedRooms" INTEGER NOT NULL DEFAULT 0,
    "dynamicPrice" REAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "room_inventory_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "user_sessions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "expires" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "user_sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "booking_cancellations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "bookingId" TEXT NOT NULL,
    "bookingType" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "cancellationFee" REAL NOT NULL DEFAULT 0,
    "refundAmount" REAL NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "processedAt" DATETIME,
    "processedBy" TEXT,
    "adminNotes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "payment_methods" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "last4" TEXT,
    "brand" TEXT,
    "expiryMonth" INTEGER,
    "expiryYear" INTEGER,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "metadata" TEXT NOT NULL DEFAULT '{}',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "payment_methods_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "trains" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "trainNumber" TEXT NOT NULL,
    "trainName" TEXT NOT NULL,
    "departure" TEXT NOT NULL,
    "arrival" TEXT NOT NULL,
    "departureTime" TEXT NOT NULL,
    "arrivalTime" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "distance" INTEGER NOT NULL,
    "frequency" TEXT NOT NULL DEFAULT '[1,2,3,4,5,6,7]',
    "trainType" TEXT NOT NULL DEFAULT 'Express',
    "classes" TEXT NOT NULL DEFAULT '["SL", "3A", "2A", "1A"]',
    "basePrice" REAL NOT NULL,
    "priceMultiplier" TEXT NOT NULL DEFAULT '{}',
    "totalSeats" INTEGER NOT NULL DEFAULT 800,
    "availableSeats" INTEGER NOT NULL,
    "route" TEXT NOT NULL DEFAULT '[]',
    "amenities" TEXT NOT NULL DEFAULT '[]',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "train_bookings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "trainId" TEXT NOT NULL,
    "bookingRef" TEXT NOT NULL,
    "pnr" TEXT,
    "passengers" TEXT NOT NULL,
    "seatNumbers" TEXT NOT NULL DEFAULT '[]',
    "class" TEXT NOT NULL DEFAULT 'SL',
    "travelDate" DATETIME NOT NULL,
    "departureStation" TEXT NOT NULL,
    "arrivalStation" TEXT NOT NULL,
    "baseAmount" REAL NOT NULL,
    "taxAmount" REAL NOT NULL DEFAULT 0,
    "convenienceFee" REAL NOT NULL DEFAULT 0,
    "discountAmount" REAL NOT NULL DEFAULT 0,
    "totalAmount" REAL NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "paymentId" TEXT,
    "paymentStatus" TEXT NOT NULL DEFAULT 'pending',
    "contactEmail" TEXT NOT NULL,
    "contactPhone" TEXT NOT NULL,
    "specialRequests" TEXT,
    "mealPreference" TEXT,
    "confirmationNumber" TEXT,
    "ticketNumber" TEXT,
    "boardingPoint" TEXT,
    "droppingPoint" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "train_bookings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "train_bookings_trainId_fkey" FOREIGN KEY ("trainId") REFERENCES "trains" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "verification_tokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_flight_bookings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "flightId" TEXT NOT NULL,
    "bookingRef" TEXT NOT NULL,
    "pnr" TEXT,
    "passengers" TEXT NOT NULL,
    "seatNumbers" TEXT NOT NULL DEFAULT '[]',
    "class" TEXT NOT NULL DEFAULT 'economy',
    "baseAmount" REAL NOT NULL,
    "taxAmount" REAL NOT NULL DEFAULT 0,
    "feeAmount" REAL NOT NULL DEFAULT 0,
    "discountAmount" REAL NOT NULL DEFAULT 0,
    "totalAmount" REAL NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "paymentId" TEXT,
    "paymentStatus" TEXT NOT NULL DEFAULT 'pending',
    "contactEmail" TEXT NOT NULL,
    "contactPhone" TEXT NOT NULL,
    "specialRequests" TEXT,
    "baggage" TEXT NOT NULL DEFAULT '{}',
    "mealPreference" TEXT,
    "confirmationNumber" TEXT,
    "eTicketNumber" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "flight_bookings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "flight_bookings_flightId_fkey" FOREIGN KEY ("flightId") REFERENCES "flights" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_flight_bookings" ("bookingRef", "contactEmail", "contactPhone", "createdAt", "flightId", "id", "passengers", "paymentId", "paymentStatus", "status", "totalAmount", "updatedAt", "userId") SELECT "bookingRef", "contactEmail", "contactPhone", "createdAt", "flightId", "id", "passengers", "paymentId", "paymentStatus", "status", "totalAmount", "updatedAt", "userId" FROM "flight_bookings";
DROP TABLE "flight_bookings";
ALTER TABLE "new_flight_bookings" RENAME TO "flight_bookings";
CREATE UNIQUE INDEX "flight_bookings_bookingRef_key" ON "flight_bookings"("bookingRef");
CREATE UNIQUE INDEX "flight_bookings_pnr_key" ON "flight_bookings"("pnr");
CREATE UNIQUE INDEX "flight_bookings_confirmationNumber_key" ON "flight_bookings"("confirmationNumber");
CREATE TABLE "new_flights" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "airline" TEXT NOT NULL,
    "flightNumber" TEXT NOT NULL,
    "departure" TEXT NOT NULL,
    "arrival" TEXT NOT NULL,
    "departureDate" DATETIME NOT NULL,
    "departureTime" DATETIME NOT NULL,
    "arrivalDate" DATETIME NOT NULL,
    "arrivalTime" DATETIME NOT NULL,
    "duration" TEXT NOT NULL,
    "basePrice" REAL NOT NULL,
    "discountPrice" REAL,
    "totalSeats" INTEGER NOT NULL DEFAULT 180,
    "availableSeats" INTEGER NOT NULL,
    "aircraft" TEXT NOT NULL DEFAULT 'Boeing 737',
    "flightType" TEXT NOT NULL DEFAULT 'domestic',
    "classTypes" TEXT NOT NULL DEFAULT '["economy", "business"]',
    "amenities" TEXT NOT NULL DEFAULT '[]',
    "baggage" TEXT NOT NULL DEFAULT '{}',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "operatingDays" TEXT NOT NULL DEFAULT '[1,2,3,4,5,6,7]',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_flights" ("aircraft", "airline", "arrival", "arrivalTime", "availableSeats", "createdAt", "departure", "departureTime", "duration", "flightNumber", "id", "isActive", "updatedAt") SELECT coalesce("aircraft", 'Boeing 737') AS "aircraft", "airline", "arrival", "arrivalTime", "availableSeats", "createdAt", "departure", "departureTime", "duration", "flightNumber", "id", "isActive", "updatedAt" FROM "flights";
DROP TABLE "flights";
ALTER TABLE "new_flights" RENAME TO "flights";
CREATE UNIQUE INDEX "flights_flightNumber_key" ON "flights"("flightNumber");
CREATE TABLE "new_hotel_bookings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "hotelId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "bookingRef" TEXT NOT NULL,
    "checkIn" DATETIME NOT NULL,
    "checkOut" DATETIME NOT NULL,
    "nights" INTEGER NOT NULL,
    "adults" INTEGER NOT NULL DEFAULT 1,
    "children" INTEGER NOT NULL DEFAULT 0,
    "rooms" INTEGER NOT NULL DEFAULT 1,
    "roomPrice" REAL NOT NULL,
    "taxAmount" REAL NOT NULL DEFAULT 0,
    "discountAmount" REAL NOT NULL DEFAULT 0,
    "totalAmount" REAL NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "paymentId" TEXT,
    "paymentStatus" TEXT NOT NULL DEFAULT 'pending',
    "guestName" TEXT NOT NULL,
    "guestEmail" TEXT NOT NULL,
    "guestPhone" TEXT NOT NULL,
    "specialRequests" TEXT,
    "cancellationPolicy" TEXT,
    "confirmationNumber" TEXT,
    "checkInTime" TEXT,
    "checkOutTime" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "hotel_bookings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "hotel_bookings_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotels" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "hotel_bookings_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_hotel_bookings" ("checkIn", "checkOut", "createdAt", "guestEmail", "guestName", "guestPhone", "hotelId", "id", "paymentId", "paymentStatus", "roomId", "specialRequests", "status", "totalAmount", "updatedAt", "userId") SELECT "checkIn", "checkOut", "createdAt", "guestEmail", "guestName", "guestPhone", "hotelId", "id", "paymentId", "paymentStatus", "roomId", "specialRequests", "status", "totalAmount", "updatedAt", "userId" FROM "hotel_bookings";
DROP TABLE "hotel_bookings";
ALTER TABLE "new_hotel_bookings" RENAME TO "hotel_bookings";
CREATE UNIQUE INDEX "hotel_bookings_bookingRef_key" ON "hotel_bookings"("bookingRef");
CREATE UNIQUE INDEX "hotel_bookings_confirmationNumber_key" ON "hotel_bookings"("confirmationNumber");
CREATE TABLE "new_hotels" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL DEFAULT 'Jharkhand',
    "pincode" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "website" TEXT,
    "rating" REAL NOT NULL DEFAULT 4.0,
    "reviewCount" INTEGER NOT NULL DEFAULT 0,
    "images" TEXT NOT NULL DEFAULT '[]',
    "amenities" TEXT NOT NULL DEFAULT '[]',
    "policies" TEXT NOT NULL DEFAULT '{}',
    "latitude" REAL,
    "longitude" REAL,
    "checkInTime" TEXT NOT NULL DEFAULT '14:00',
    "checkOutTime" TEXT NOT NULL DEFAULT '11:00',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "priceRange" TEXT NOT NULL DEFAULT 'budget',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_hotels" ("address", "amenities", "city", "createdAt", "description", "email", "id", "images", "isActive", "latitude", "longitude", "name", "phone", "pincode", "rating", "state", "updatedAt") SELECT "address", "amenities", "city", "createdAt", "description", "email", "id", "images", "isActive", "latitude", "longitude", "name", "phone", "pincode", "rating", "state", "updatedAt" FROM "hotels";
DROP TABLE "hotels";
ALTER TABLE "new_hotels" RENAME TO "hotels";
CREATE TABLE "new_rooms" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "hotelId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT,
    "maxGuests" INTEGER NOT NULL DEFAULT 2,
    "basePrice" REAL NOT NULL,
    "discountPrice" REAL,
    "size" TEXT,
    "bedType" TEXT NOT NULL DEFAULT 'double',
    "view" TEXT,
    "images" TEXT NOT NULL DEFAULT '[]',
    "amenities" TEXT NOT NULL DEFAULT '[]',
    "totalRooms" INTEGER NOT NULL DEFAULT 1,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "rooms_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotels" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_rooms" ("amenities", "basePrice", "createdAt", "description", "hotelId", "id", "images", "isActive", "maxGuests", "name", "type", "updatedAt") SELECT "amenities", "basePrice", "createdAt", "description", "hotelId", "id", "images", "isActive", "maxGuests", "name", "type", "updatedAt" FROM "rooms";
DROP TABLE "rooms";
ALTER TABLE "new_rooms" RENAME TO "rooms";
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "password" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "role" TEXT NOT NULL DEFAULT 'user',
    "avatar" TEXT,
    "preferences" TEXT NOT NULL DEFAULT '{}',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_users" ("createdAt", "email", "id", "name", "phone", "updatedAt") SELECT "createdAt", "email", "id", "name", "phone", "updatedAt" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "payments_transactionId_key" ON "payments"("transactionId");

-- CreateIndex
CREATE UNIQUE INDEX "room_availability_roomId_date_key" ON "room_availability"("roomId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "room_inventory_roomId_date_key" ON "room_inventory"("roomId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "user_sessions_sessionToken_key" ON "user_sessions"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "trains_trainNumber_key" ON "trains"("trainNumber");

-- CreateIndex
CREATE UNIQUE INDEX "train_bookings_bookingRef_key" ON "train_bookings"("bookingRef");

-- CreateIndex
CREATE UNIQUE INDEX "train_bookings_pnr_key" ON "train_bookings"("pnr");

-- CreateIndex
CREATE UNIQUE INDEX "train_bookings_confirmationNumber_key" ON "train_bookings"("confirmationNumber");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_providerAccountId_key" ON "accounts"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_sessionToken_key" ON "sessions"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_token_key" ON "verification_tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_identifier_token_key" ON "verification_tokens"("identifier", "token");

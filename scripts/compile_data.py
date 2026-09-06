# -*- "coding": utf-8 -*-
import json
import os

data = [
    # DHAKA DIVISION (1-13)
    {
        "id": "dhaka", "name": "Dhaka", "bnName": "ঢাকা", "geoName": "Dhaka",
        "division": "Dhaka", "divisionBn": "ঢাকা", "lat": 23.8103, "lng": 90.4125, "areaKm2": 1463,
        "tagline": "Capital metropolis of four hundred years of Mughal and modern heritage",
        "taglineBn": "৪০০ বছরের ঐতিহ্যবাহী মুঘল রাজধানী ও প্রাণবন্ত মেগাসিটি",
        "touristSpots": [
            {"name": "Lalbagh Fort", "bnName": "লালবাগ কেল্লা", "desc": "17th-century Mughal fortress complex", "image": "https://images.unsplash.com/photo-1588083949404-c4f1ed1323b3?w=800&auto=format&fit=crop&q=80"},
            {"name": "Ahsan Manzil", "bnName": "আহসান মঞ্জিল", "desc": "Historic Pink Palace of the Nawabs on the Buriganga river"},
            {"name": "National Parliament", "bnName": "জাতীয় সংসদ ভবন", "desc": "Iconic architectural wonder designed by Louis Kahn"},
            {"name": "Ramna Park", "bnName": "রমনা পার্ক", "desc": "Historic green park and heart of Pohela Boishakh festivities"},
            {"name": "Panam City", "bnName": "পানাম নগর (সোনারগাঁও)", "desc": "Ancient merchant settlement with terracotta architecture"}
        ],
        "famousFoods": [
            {"name": "Old Dhaka Biryani", "bnName": "পুরান ঢাকার বিরিয়ানি (হাজী/নান্না)", "desc": "Aromatic kacchi biryani cooked in large degs over wood fires"},
            {"name": "Bakarkhani", "bnName": "বাকরখানি", "desc": "Layered crisp spiced bread of the Mughal era"},
            {"name": "Suti Kebab", "bnName": "সুতি কাবাব", "desc": "Thread-bound tender spiced charcoal beef kebab"},
            {"name": "Matha & Ghol", "bnName": "মাঠা", "desc": "Refreshing traditional curd drink"}
        ],
        "culture": {
            "history": "Established as Mughal provincial capital Jahangirnagar in 1610; center of the 1952 Language Movement and 1971 Liberation War.",
            "traditions": "Shakrain kite flying festival, Mongol Shobhajatra, rickshaw paint art, and lively adda in Old Dhaka.",
            "festivals": ["Shakrain Festival", "Pohela Boishakh", "Ekushey Book Fair"],
            "summaryBn": "৪০০ বছরের পুরনো ঐতিহ্য, পুরান ঢাকার সাকরাইন উৎসব, বৈশাখী শোভাযাত্রা ও দ্রুতগতির নগর জীবন।"
        },
        "coverImage": "https://images.unsplash.com/photo-1588083949404-c4f1ed1323b3?w=800&auto=format&fit=crop&q=80",
        "quickFacts": {"famousFor": "Lalbagh Fort, Shakrain, Old Dhaka Biryani", "mustTryDish": "Haji Biryani with Bakarkhani", "nicknames": ["City of Mosques", "Rickshaw Capital"]}
    },
    {
        "id": "gazipur", "name": "Gazipur", "bnName": "গাজীপুর", "geoName": "Gazipur",
        "division": "Dhaka", "divisionBn": "ঢাকা", "lat": 24.0023, "lng": 90.4267, "areaKm2": 1806,
        "tagline": "Lush evergreen Sal forest trails & eco-tourism resorts",
        "taglineBn": "শালবনের শ্যামল প্রকৃতি, নুহাশ পল্লী ও শিল্প হাব",
        "touristSpots": [
            {"name": "Bhawal National Park", "bnName": "ভাওয়াল জাতীয় উদ্যান", "desc": "Protected lush Sal forest and eco park", "image": "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80"},
            {"name": "Nuhash Polli", "bnName": "নুহাশ পল্লী", "desc": "Author Humayun Ahmed's serene garden haven"},
            {"name": "Bangabandhu Safari Park", "bnName": "বঙ্গবন্ধু শেখ মুজিব সাফারি পার্ক", "desc": "Sprawling wildlife sanctuary and open safari"},
            {"name": "Zinda Park", "bnName": "জিন্দা পার্ক", "desc": "Eco-friendly community park with serene tree canopies"}
        ],
        "famousFoods": [
            {"name": "Bhawal Jackfruit", "bnName": "ভাওয়াল এলাকার কাঁঠাল", "desc": "Sweet fragrant jackfruit harvested from red soil"},
            {"name": "Rice Pitha", "bnName": "চালের পিঠা", "desc": "Traditional handmade winter dumplings"},
            {"name": "Clay-pot Kasundi", "bnName": "মাটির হাঁড়ির কাসুন্দি", "desc": "Zesty fermented mustard relish"}
        ],
        "culture": {
            "history": "Seat of the historic Bhawal Estate and Sanyasi Raja trial of the early 20th century.",
            "traditions": "Forestry folklore, winter village pitha gatherings, and modern apparel industry culture.",
            "festivals": ["Bhawal Mela", "Winter Harvest Festival"],
            "summaryBn": "গজারী বনের মনোরম প্রকৃতি, ইন্ডাস্ট্রিয়াল কালচার (গার্মেন্টস হাব) ও ভাওয়াল রাজার ইতিহাস।"
        },
        "coverImage": "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80",
        "quickFacts": {"famousFor": "Safari Park, Bhawal Sal Forest, Nuhash Polli", "mustTryDish": "Clay-pot Kasundi with Seasonal Fruits", "nicknames": ["Eco-Resort Capital"]}
    },
    {
        "id": "narayanganj", "name": "Narayanganj", "bnName": "নারায়ণগঞ্জ", "geoName": "Narayanganj",
        "division": "Dhaka", "divisionBn": "ঢাকা", "lat": 23.6238, "lng": 90.5000, "areaKm2": 759,
        "tagline": "The historic Dundee of the East & world-renowned Jamdani weavers",
        "taglineBn": "প্রাচ্যের ডান্ডি ও বিশ্বখ্যাত জামদানি শাড়ির ঐতিহ্যবাহী নগরী",
        "touristSpots": [
            {"name": "Sonargaon Folk Art Museum", "bnName": "সোনারগাঁও লোকশিল্প জাদুঘর", "desc": "Rich heritage of craft and royal antiquities", "image": "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&auto=format&fit=crop&q=80"},
            {"name": "Panam City", "bnName": "পানাম নগর", "desc": "Historic boulevard of 19th-century merchant mansions"},
            {"name": "Kadam Rasul Dargah", "bnName": "কদম রসুল দরগাহ", "desc": "Spiritual shrine on the bank of Shitalakshya river"},
            {"name": "Hajiganj Fort", "bnName": "জ্যাঙ্গামির কেল্লা (হাজীগঞ্জ কেল্লা)", "desc": "Historic Mughal river fort"}
        ],
        "famousFoods": [
            {"name": "Jamdani Sweet", "bnName": "মিষ্টির রাজা 'জামদানি মিষ্টি'", "desc": "Rich artisanal sweet inspired by intricate saree motifs"},
            {"name": "Nabiganj Chop", "bnName": "নবীগঞ্জের চপ", "desc": "Crisp fried spiced cutlets by the ferry"},
            {"name": "Traditional Halwa", "bnName": "ঐতিহ্যবাহী হালুয়া", "desc": "Silky festive semolina halwa"}
        ],
        "culture": {
            "history": "Ancient capital Sonargaon was seat of Sultan Fakhruddin Mubarak Shah and ruler Isa Khan.",
            "traditions": "UNESCO-recognized Jamdani weaving, bustling river haulage, and folk craft fairs.",
            "festivals": ["Lok Shilpa Mela", "Jamdani Craft Expo"],
            "summaryBn": "প্রাচ্যের ডান্ডি খ্যাত পাট ও পোশাক শিল্প, তাঁত ও বিশ্বখ্যাত জামদানি শাড়ির ঐতিহ্য।"
        },
        "coverImage": "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&auto=format&fit=crop&q=80",
        "quickFacts": {"famousFor": "Sonargaon, Jamdani Weaving, Panam Nagar", "mustTryDish": "Royal Jamdani Mishti", "nicknames": ["Dundee of the East"]}
    },
    {
        "id": "munshiganj", "name": "Munshiganj", "bnName": "মুন্সীগঞ্জ", "geoName": "Munshiganj",
        "division": "Dhaka", "divisionBn": "ঢাকা", "lat": 23.5422, "lng": 90.5305, "areaKm2": 954,
        "tagline": "Cradle of ancient Bikrampur kings and Atish Dipankar",
        "taglineBn": "ঐতিহাসিক বিক্রমপুরের গৌরব ও পদ্মাপাড়ের সমৃদ্ধ জনপদ",
        "touristSpots": [
            {"name": "Idrakpur Fort", "bnName": "ইদ্রাকপুর কেল্লা", "desc": "1660 AD river fortress built to ward off pirates", "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80"},
            {"name": "Baba Adam Mosque", "bnName": "বাবা আদম মসজিদ", "desc": "15th-century terracotta Sultanate mosque"},
            {"name": "Atish Dipankar Birthplace", "bnName": "অতীশ দীপঙ্করের জন্মস্থান", "desc": "Memorial of great Buddhist scholar who taught in Tibet"},
            {"name": "Padma Riverside", "bnName": "পদ্মাপাড়", "desc": "Scenic open riverfront with majestic sunset views"}
        ],
        "famousFoods": [
            {"name": "Bhagyakul Sweets", "bnName": "ভাগ্যকুলের মিষ্টি", "desc": "Century-old curd and milk sweet legacy"},
            {"name": "Munshiganj Potatoes", "bnName": "মুন্সীগঞ্জের আলু", "desc": "Prized golden potatoes from fertile silt soil"},
            {"name": "Patkheer", "bnName": "পাতক্ষীর", "desc": "Condensed baked milk pudding wrapped in leaves"}
        ],
        "culture": {
            "history": "Ancient political center of Bengal under the Sena and Chandra dynasties.",
            "traditions": "Boat racing tournaments (Nouka Baich), bell metal craft, and river folk poetry.",
            "festivals": ["Bikrampur Heritage Fair", "Nouka Baich"],
            "summaryBn": "বিক্রমপুরের প্রাচীন ইতিহাস, পদ্মা নদীর কোলঘেঁষা নৌকা বাইচ ও কৃষিজ জীবন।"
        },
        "coverImage": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80",
        "quickFacts": {"famousFor": "Idrakpur Fort, Atish Dipankar, Patkheer", "mustTryDish": "Bhagyakul Patkheer", "nicknames": ["Ancient Bikrampur"]}
    },
    {
        "id": "manikganj", "name": "Manikganj", "bnName": "মানিকগঞ্জ", "geoName": "Manikganj",
        "division": "Dhaka", "divisionBn": "ঢাকা", "lat": 23.8644, "lng": 90.0047, "areaKm2": 1379,
        "tagline": "Opulent Baliati Palace & the legendary Hazari Gur nectar",
        "taglineBn": "ঐতিহাসিক বলিয়াদী রাজবাড়ি ও সুগন্ধি হাজারী গুড়ের দেশ",
        "touristSpots": [
            {"name": "Baliati Palace", "bnName": "বলিয়াটি রাজবাড়ি", "desc": "Gigantic 19th-century neoclassical palace complex", "image": "https://images.unsplash.com/photo-1548013146-72479768bbaa?w=800&auto=format&fit=crop&q=80"},
            {"name": "Teota Zamindar Bari", "bnName": "তেওতা জমিদার বাড়ি", "desc": "Picturesque river palace inspiring poet Kazi Nazrul Islam"},
            {"name": "Porabari Riverfront", "bnName": "পোড়াবাড়ী", "desc": "Peaceful scenic waterways along the Dhaleshwari"}
        ],
        "famousFoods": [
            {"name": "Hazari Gur", "bnName": "হাজারী গুড় (খেজুরের রস থেকে তৈরি স্পেশাল গুড়)", "desc": "Rare aromatic white crystalline date palm jaggery"}
        ],
        "culture": {
            "history": "Aristocratic Zamindari stronghold on maritime trade routes toward North Bengal.",
            "traditions": "Baul and Bichar gaan folk vocal debates, and date palm extraction mastery.",
            "festivals": ["Hazari Gur Winter Fair", "Teota Music Soiree"],
            "summaryBn": "মানিকগঞ্জের লোকসংগীত (বাউল ও বিচার গান) এবং হাজারী গুড়ের শতবর্ষী ঐতিহ্য।"
        },
        "coverImage": "https://images.unsplash.com/photo-1548013146-72479768bbaa?w=800&auto=format&fit=crop&q=80",
        "quickFacts": {"famousFor": "Baliati Palace, Hazari Gur, Baul music", "mustTryDish": "Original Hazari Gur", "nicknames": ["Palace District"]}
    },
    {
        "id": "narsingdi", "name": "Narsingdi", "bnName": "নরসিংদী", "geoName": "Narsingdi",
        "division": "Dhaka", "divisionBn": "ঢাকা", "lat": 23.9322, "lng": 90.7154, "areaKm2": 1141,
        "tagline": "2500-year-old Wari-Bateshwar & sprawling textile commerce",
        "taglineBn": "উয়ারী-বটেশ্বরের আড়াই হাজার বছরের সভ্যতা ও তাঁতের হাট",
        "touristSpots": [
            {"name": "Wari-Bateshwar", "bnName": "উয়ারী-বটেশ্বর (প্রাচীন সভ্যতা)", "desc": "Ancient urban fortified archaeological site dating to 450 BC", "image": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80"},
            {"name": "Dream Holiday Park", "bnName": "ড্রিম ডে সল্ট পার্ক", "desc": "Popular modern recreation and family amusement park"},
            {"name": "Lakshman Saha Zamindar Bari", "bnName": "লক্ষ্মণ সাহার জমিদার বাড়ি", "desc": "Stately colonial manor with ornate columns"}
        ],
        "famousFoods": [
            {"name": "Sagor Banana", "bnName": "সাগর কলা", "desc": "Naturally sweet, fragrant local bananas"},
            {"name": "Narsingdi Lotkon", "bnName": "নরসিংদীর লটকন", "desc": "GI-certified sweet and tangy Burmese grape fruit"},
            {"name": "Chhana Sweets", "bnName": "মিষ্টি", "desc": "Fresh cottage cheese sweets"}
        ],
        "culture": {
            "history": "One of South Asia's oldest trade river ports connecting to Southeast Asia and the Mediterranean.",
            "traditions": "Babar Hat and Shekherchar handloom markets, textile trading culture.",
            "festivals": ["Lotkon Utsab", "Boishakhi Haat Fair"],
            "summaryBn": "তাঁতশিল্পের সমৃদ্ধি (শেখেরচর হাটের জন্য বিখ্যাত) ও দেশের অন্যতম প্রাচীন প্রত্নতাত্ত্বিক স্থান।"
        },
        "coverImage": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80",
        "quickFacts": {"famousFor": "Wari-Bateshwar, Lotkon fruit, Handloom sarees", "mustTryDish": "Fresh Orchard Lotkon & Sagor Banana", "nicknames": ["Textile Hub of Bengal"]}
    },
    {
        "id": "faridpur", "name": "Faridpur", "bnName": "ফরিদপুর", "geoName": "Faridpur",
        "division": "Dhaka", "divisionBn": "ঢাকা", "lat": 23.6071, "lng": 89.8429, "areaKm2": 2073,
        "tagline": "Homeland of folk poet Jasimuddin & golden date molasses",
        "taglineBn": "পল্লীকবি জসীমউদ্দীন-এর স্মৃতিধন্য পাট ও খেজুর গুড়ের জনপদ",
        "touristSpots": [
            {"name": "Poet Jasimuddin Residence", "bnName": "কবি জসীমউদ্দীন-এর বাড়ি", "desc": "Ancestral home where celebrated folklore poetry was written", "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80"},
            {"name": "Baish Rashi Zamindar Bari", "bnName": "বাইশ রশি জমিদার বাড়ি", "desc": "Grand historic mansion with multiple courtyards"},
            {"name": "River Research Institute", "bnName": "নদী গবেষণা ইনস্টিটিউট", "desc": "Pioneering center for river physics and hydrology"}
        ],
        "famousFoods": [
            {"name": "Date Palm Molasses", "bnName": "খেজুরের গুড়", "desc": "Premium winter gur renowned for sweet fragrance"},
            {"name": "Khambaj Sweets", "bnName": "খাম্বাজ মিষ্টি", "desc": "Special browned milk confection"},
            {"name": "Date Palm Nectar", "bnName": "ফরিদপুরের খেজুর রস", "desc": "Freshly tapped sweet tree sap"}
        ],
        "culture": {
            "history": "Named after 12th-century Sufi saint Shah Farid; celebrated worldwide in Polli Kobi Jasimuddin's verse.",
            "traditions": "Nakshi Kantha embroidered quilt craftsmanship, folk theatre, and rural village fairs.",
            "festivals": ["Jasim Polli Mela", "Winter Date Harvest Festival"],
            "summaryBn": "পল্লীকবি জসীমউদ্দীনের সাহিত্য-ঐতিহ্য, জসীম পল্লী মেলা এবং চরাঞ্চলের সংস্কৃতি।"
        },
        "coverImage": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
        "quickFacts": {"famousFor": "Poet Jasimuddin, Date Palm Gur, Nakshi Kantha", "mustTryDish": "Khambaj Sweets with Fresh Date Molasses", "nicknames": ["Land of the Folk Poet"]}
    },
    {
        "id": "madaripur", "name": "Madaripur", "bnName": "মাদারীপুর", "geoName": "Madaripur",
        "division": "Dhaka", "divisionBn": "ঢাকা", "lat": 23.1641, "lng": 90.1897, "areaKm2": 1145,
        "tagline": "Historic Shakuni Dighi lake and serene Sufi heritage",
        "taglineBn": "শকুনি দিঘির শান্ত রূপ ও সুফি সাধক শাহ মাদারের স্মৃতি",
        "touristSpots": [
            {"name": "Shakuni Dighi", "bnName": "শকুনি দিঘি", "desc": "Grand historic reservoir in town center", "image": "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&auto=format&fit=crop&q=80"},
            {"name": "Algi Kazi Bari Mosque", "bnName": "আলগী কাজী বাড়ি মসজিদ", "desc": "Ancient Islamic architectural heritage"},
            {"name": "Pranavananda Math", "bnName": "প্রণবানন্দ মঠ", "desc": "Peaceful ashram founded by saint Swami Pranavananda"}
        ],
        "famousFoods": [
            {"name": "Madaripur Rosogolla", "bnName": "মাদারীপুরের রসগোল্লা", "desc": "Pillowy soft cottage cheese spheres in light syrup"},
            {"name": "Tal Patali Gur", "bnName": "তাল পাটালি গুড়", "desc": "Solidified aromatic palmyra palm toffee"}
        ],
        "culture": {
            "history": "Named after 15th-century Sufi saint Badruddin Shah Madar.",
            "traditions": "Canal-side pastoral living, folk singing, and handcrafted date leaf mats.",
            "festivals": ["Shah Madar Urs", "Boishakhi Mela"],
            "summaryBn": "আউলিয়া ও সাধু-সন্ন্যাসীদের স্মৃতিধন্য ভূমি, নদীকেন্দ্রিক জীবন।"
        },
        "coverImage": "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&auto=format&fit=crop&q=80",
        "quickFacts": {"famousFor": "Shakuni Dighi, Tal Patali Gur, Rosogolla", "mustTryDish": "Warm Madaripur Rosogolla", "nicknames": ["Lake City of Bengal"]}
    },
    {
        "id": "shariatpur", "name": "Shariatpur", "bnName": "শরীয়তপুর", "geoName": "Shariatpur",
        "division": "Dhaka", "divisionBn": "ঢাকা", "lat": 23.2423, "lng": 90.3541, "areaKm2": 1182,
        "tagline": "Legacy of the Faraizi movement & prime Padma river Hilsa",
        "taglineBn": "হাজী শরীয়তুল্লাহর সংস্কার আন্দোলন ও পদ্মার রূপালি ইলিশ",
        "touristSpots": [
            {"name": "Burirhat Bijoy Memorial", "bnName": "বুড়িরহাট বিজয় ময়দান", "desc": "War of Liberation memorial site", "image": "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&auto=format&fit=crop&q=80"},
            {"name": "Sureshwar Darbar Sharif", "bnName": "সুরেশ্বর দরবার শরীফ", "desc": "Famed spiritual shrine along the riverbank"},
            {"name": "Ramkanai Jiu Temple", "bnName": "রামকানাই জিও মন্দির", "desc": "Ancient Hindu temple with historic terracotta work"}
        ],
        "famousFoods": [
            {"name": "Naria Sweets", "bnName": "নড়িয়া টেস্টের মিষ্টি", "desc": "Melt-in-mouth milk curd sweet"},
            {"name": "Kachagolla", "bnName": "কাঁচাগোল্লা", "desc": "Pure delicate unbaked sweet cottage cheese"},
            {"name": "Padma Hilsa", "bnName": "নদীর টাটকা ইলিশ", "desc": "Fresh fatty river Hilsa fried with green chilies"}
        ],
        "culture": {
            "history": "Named in honor of Haji Shariatullah, leader of the historic 19th-century Faraizi movement.",
            "traditions": "Padma river delta fishing folklore, boat songs, and rural perseverance.",
            "festivals": ["Sureshwar Urs", "Padma River Carnival"],
            "summaryBn": "হাজী শরীয়তুল্লাহর ফারায়েজী আন্দোলনের ইতিহাস ও পদ্মাপাড়ের জীবন সংগ্রাম।"
        },
        "coverImage": "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&auto=format&fit=crop&q=80",
        "quickFacts": {"famousFor": "Haji Shariatullah, Sureshwar Dargah, Padma Hilsa", "mustTryDish": "Fresh Fried Padma Hilsa with Naria Sweets", "nicknames": ["Gateway to Southern Padma"]}
    },
    {
        "id": "gopalganj", "name": "Gopalganj", "bnName": "গোপালগঞ্জ", "geoName": "Gopalganj",
        "division": "Dhaka", "divisionBn": "ঢাকা", "lat": 23.0051, "lng": 89.8266, "areaKm2": 1490,
        "tagline": "Birthplace of Father of the Nation Bangabandhu at Tungipara",
        "taglineBn": "বঙ্গবন্ধুর সমাধিধন্য টুঙ্গিপাড়া ও রূপসী মধুমতী নদী",
        "touristSpots": [
            {"name": "Tungipara Memorial Complex", "bnName": "টুঙ্গিপাড়া (বঙ্গবন্ধুর সমাধি সৌধ)", "desc": "National memorial commemorating Bangabandhu Sheikh Mujibur Rahman", "image": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&auto=format&fit=crop&q=80"},
            {"name": "Bill Route Canal", "bnName": "বিল রুট ক্যানেল", "desc": "Scenic canal passing through blooming water-lily wetlands"},
            {"name": "Chandravarma Fort", "bnName": "চন্দ্রবর্মা কেল্লা (কোটালীপাড়া)", "desc": "Ancient 6th-century fortress ruins"}
        ],
        "famousFoods": [
            {"name": "Mutton Fat Sweets", "bnName": "খাসির চর্বির মিষ্টি", "desc": "Unique traditional dessert made with clarified animal fat and spices"},
            {"name": "Rosa Sweets", "bnName": "রসা মিষ্টি", "desc": "Syrupy cardamom-infused curd sweet"},
            {"name": "Madhumati Fish", "bnName": "পদ্মার মাছ", "desc": "Freshwater delicacy from river currents"}
        ],
        "culture": {
            "history": "Fountainhead of Bangladesh independence history; renowned for historic Kotalipara copperplate inscriptions.",
            "traditions": "Water lily harvest in vast beels, wooden boat craftsmanship, and patriotic pride.",
            "festivals": ["Tungipara National Memorial Gathering", "Boishakhi Mela"],
            "summaryBn": "বাংলাদেশের রাজনৈতিক ইতিহাসের প্রাণকেন্দ্র ও মধুমতী নদীর লোকজ রূপ।"
        },
        "coverImage": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&auto=format&fit=crop&q=80",
        "quickFacts": {"famousFor": "Tungipara Mausoleum, Bill Route Canal, Madhumati river", "mustTryDish": "Rosa Mishti", "nicknames": ["Cradle of Independence"]}
    },
    {
        "id": "rajbari", "name": "Rajbari", "bnName": "রাজবাড়ী", "geoName": "Rajbari",
        "division": "Dhaka", "divisionBn": "ঢাকা", "lat": 23.7574, "lng": 89.6445, "areaKm2": 1119,
        "tagline": "Homeland of novelist Mir Mosharraf Hossain & royal Goalanda Chamcham",
        "taglineBn": "মীর মশাররফ হোসেনের স্মৃতি ও বিশ্বখ্যাত গোয়ালন্দের চমচম",
        "touristSpots": [
            {"name": "Mir Mosharraf Hossain Memorial", "bnName": "মীর মশাররফ হোসেন স্মৃতিকেন্দ্র", "desc": "Memorial for the author of Bengali classic Bishad Shindhu", "image": "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80"},
            {"name": "Goalanda Ghat", "bnName": "গোয়ালন্দ ঘাট", "desc": "Historic paddle steamer port and railway terminus"},
            {"name": "Zero Point", "bnName": "জিরো পয়েন্ট", "desc": "Scenic point where the Padma and Jamuna river systems converge"}
        ],
        "famousFoods": [
            {"name": "Goalanda Chamcham", "bnName": "গোয়ালন্দের চমচম", "desc": "Century-old golden-brown sweet renowned since the British steamer era"},
            {"name": "Rajbari Kheerpayesh", "bnName": "রাজবাড়ীর ক্ষীরপায়েস", "desc": "Rich slow-boiled milk rice pudding"}
        ],
        "culture": {
            "history": "Major hub of Eastern Bengal Railway linking Kolkata with Assam and Eastern Bengal.",
            "traditions": "Steamer voyage folklore, Goalanda chicken curry traditions, and riverside weekly haats.",
            "festivals": ["Mir Mosharraf Literature Fair", "Riverfront Regatta"],
            "summaryBn": "সাহিত্যিক মীর মশাররফ হোসেনের স্মৃতি এবং প্রাচীন রেলওয়ে ও নৌ-যোগাযোগের কেন্দ্র।"
        },
        "coverImage": "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80",
        "quickFacts": {"famousFor": "Goalanda Chamcham, Mir Mosharraf Hossain, Steamer Ghat", "mustTryDish": "Original Goalanda Chamcham", "nicknames": ["Steamer Gateway"]}
    },
    {
        "id": "tangail", "name": "Tangail", "bnName": "টাঙ্গাইল", "geoName": "Tangail",
        "division": "Dhaka", "divisionBn": "ঢাকা", "lat": 24.2513, "lng": 89.9167, "areaKm2": 3414,
        "tagline": "World-famous handloom Tangail Sarees & Porabari Chamcham",
        "taglineBn": "বিশ্ববিখ্যাত টাঙ্গাইল তাঁতের শাড়ি ও পোড়াবাড়ীর আসল চমচম",
        "touristSpots": [
            {"name": "Mohera Zamindar Bari", "bnName": "মহেরা জমিদার বাড়ি", "desc": "Pristinely restored colonial palace estate", "image": "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&auto=format&fit=crop&q=80"},
            {"name": "Dhanbari Nawab Palace", "bnName": "ধনবাড়ী নওয়াব বাঘ", "desc": "Stately palace of Nawab Syed Nawab Ali Chowdhury"},
            {"name": "Atia Mosque", "bnName": "আতিয়া মসজিদ", "desc": "Terracotta 1609 Sultanate-Mughal mosque depicted on currency notes"},
            {"name": "Madhupur Forest", "bnName": "মধুপুর গড়", "desc": "Deciduous Sal reserve home to indigenous Garo communities"}
        ],
        "famousFoods": [
            {"name": "Porabari Chamcham", "bnName": "পোড়াবাড়ীর চমচম", "desc": "Legendary sweet with a caramelized crust and luscious center"},
            {"name": "Madhupur Pineapple", "bnName": "মধুপুরের আনারস", "desc": "Naturally honey-sweet tropical giant pineapples"}
        ],
        "culture": {
            "history": "Epicenter of Bengali jacquard handloom weaving; celebrated in world fashion.",
            "traditions": "Taant weaving artistry, indigenous Garo Wangala harvest dance, and forest folklore.",
            "festivals": ["Tangail Taant Mela", "Wangala Harvest Festival", "Porabari Sweet Utsab"],
            "summaryBn": "টাঙ্গাইলের বিশ্ববিখ্যাত তাঁতের শাড়ি এবং মধুপুরের বনাঞ্চলের সংস্কৃতি।"
        },
        "coverImage": "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&auto=format&fit=crop&q=80",
        "quickFacts": {"famousFor": "Tangail Handloom Sarees, Porabari Chamcham, Atia Mosque", "mustTryDish": "Hot Porabari Chamcham", "nicknames": ["Taant Capital of Bangladesh"]}
    },
    {
        "id": "kishoreganj", "name": "Kishoreganj", "bnName": "কিশোরগঞ্জ", "geoName": "Kishoreganj",
        "division": "Dhaka", "divisionBn": "ঢাকা", "lat": 24.4449, "lng": 90.7765, "areaKm2": 2688,
        "tagline": "Endless Nikli Haor freshwater sea & historic Sholakia Eidgah",
        "taglineBn": "নিকলী হাওরের জলরাশি, শোলাকিয়া ঈদগাহ ও কবি চন্দ্রাবতী",
        "touristSpots": [
            {"name": "Nikli Haor", "bnName": "নিকলী হাওর", "desc": "Vast horizon-spanning wetland wonderland", "image": "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&auto=format&fit=crop&q=80"},
            {"name": "Shahidi Mosque", "bnName": "শহীদী মসজিদ", "desc": "Historic multi-story grand Islamic shrine"},
            {"name": "Sholakia Eidgah", "bnName": "শোলাকিয়া ঈদগাহ ময়দান", "desc": "Ground hosting South Asia's largest annual Eid congregations"},
            {"name": "Isa Khan Jangalbari Fort", "bnName": "ইশা খাঁ-র জঙ্গলবাড়ি দুর্গ", "desc": "Medieval stronghold of Baro-Bhuiyan ruler Isa Khan"}
        ],
        "famousFoods": [
            {"name": "Haor Fresh Fish", "bnName": "হাওরের টাটকা মাছ", "desc": "Freshwater carps and catfish stewed with local spices"},
            {"name": "Balish Mishti", "bnName": "কিশোরগঞ্জের বালিশ মিষ্টি", "desc": "Enormous pillow-shaped sweet soaked in creamy condensed milk"}
        ],
        "culture": {
            "history": "Birthplace of first Bengali female poet Chandravati and heart of Mymensingh Geetika balladic lore.",
            "traditions": "Haor boat culture during monsoon floods, Bhatiyali boatmen songs, and grand religious gatherings.",
            "festivals": ["Sholakia Grand Eid", "Monsoon Haor Regatta"],
            "summaryBn": "হাওর অঞ্চলের অনন্য জীবনধারা, চন্দ্রাবতীর সাহিত্য ও ঐতিহ্যবাহী শোলাকিয়ার ঈদ জামাত।"
        },
        "coverImage": "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&auto=format&fit=crop&q=80",
        "quickFacts": {"famousFor": "Nikli Haor, Sholakia Eidgah, Balish Mishti", "mustTryDish": "Balish Mishti with Haor Fish Curry", "nicknames": ["Haor Queen of Central Bengal"]}
    }
]

print(f"Base data initialized with {len(data)} districts.")

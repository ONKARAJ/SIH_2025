"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Phone, X } from 'lucide-react';

interface EmergencyContact {
  name: string;
  role: string;
  phone: string;
}

interface EmergencyContactsProps {
  placeName: string;
  className?: string;
}

// Generate emergency contacts based on place name
const generateEmergencyContacts = (placeName: string): EmergencyContact[] => {
  const contacts: EmergencyContact[] = [
    {
      name: "Ajay Verma",
      role: "Emergency Coordinator",
      phone: "1234XXX789"
    },
    {
      name: "Sunita Devi", 
      role: "Local Contact",
      phone: "98XX76XXX"
    },
    {
      name: `${placeName} Control Room`,
      role: "Emergency Response",
      phone: "10XX"
    }
  ];

  // Customize based on place name for variety - covering all 36+ places
  const placeSpecificNames = {
    // Major Cities
    'Ranchi': [
      { name: "Rajesh Kumar", role: "Emergency Coordinator", phone: "9876XXX321" },
      { name: "Priya Sharma", role: "Tourist Help Desk", phone: "78XX43XXX" },
      { name: "Ranchi Control Room", role: "Emergency Response", phone: "112XX" }
    ],
    'Jamshedpur': [
      { name: "Anil Tata", role: "City Emergency Coordinator", phone: "9543XXX678" },
      { name: "Ritu Kumari", role: "Tourist Police", phone: "76XX91XXX" },
      { name: "Jamshedpur Control Room", role: "Emergency Response", phone: "102XX" }
    ],
    'Deoghar': [
      { name: "Pandit Shyam", role: "Temple Emergency Contact", phone: "7654XXX210" },
      { name: "Kamala Singh", role: "Pilgrim Assistance", phone: "85XX17XXX" },
      { name: "Deoghar Control Room", role: "Emergency Response", phone: "108XX" }
    ],
    'Hazaribagh': [
      { name: "Vikram Prasad", role: "Park Ranger", phone: "8432XXX567" },
      { name: "Anjali Devi", role: "Wildlife Emergency", phone: "92XX54XXX" },
      { name: "Hazaribagh Control Room", role: "Emergency Response", phone: "101XX" }
    ],
    'Dhanbad': [
      { name: "Suresh Coal", role: "Mining Emergency", phone: "7321XXX456" },
      { name: "Kavita Singh", role: "Tourist Coordinator", phone: "89XX32XXX" },
      { name: "Dhanbad Control Room", role: "Emergency Response", phone: "100XX" }
    ],
    'Bokaro': [
      { name: "Steel Raman", role: "Industrial Safety", phone: "6789XXX123" },
      { name: "Deepa Kumari", role: "City Emergency", phone: "94XX78XXX" },
      { name: "Bokaro Control Room", role: "Emergency Response", phone: "108XX" }
    ],
    
    // Hill Stations
    'Netarhat': [
      { name: "Ramesh Singh", role: "Hill Station Guide", phone: "8765XXX432" },
      { name: "Meera Devi", role: "Local Emergency Contact", phone: "91XX28XXX" },
      { name: "Netarhat Control Room", role: "Emergency Response", phone: "100XX" }
    ],
    'Parasnath Hill': [
      { name: "Jain Mahavir", role: "Pilgrimage Guide", phone: "5678XXX901" },
      { name: "Sunita Mountain", role: "Hill Emergency", phone: "87XX45XXX" },
      { name: "Parasnath Control Room", role: "Emergency Response", phone: "101XX" }
    ],
    
    // Waterfalls
    'Hundru Falls': [
      { name: "Waterfall Raj", role: "Waterfall Safety", phone: "4567XXX890" },
      { name: "Ganga Devi", role: "Rescue Coordinator", phone: "83XX67XXX" },
      { name: "Hundru Control Room", role: "Emergency Response", phone: "102XX" }
    ],
    'Jonha Falls': [
      { name: "Jonha Kumar", role: "Falls Guardian", phone: "3456XXX789" },
      { name: "Radha Singh", role: "Safety Officer", phone: "79XX89XXX" },
      { name: "Jonha Control Room", role: "Emergency Response", phone: "100XX" }
    ],
    'Dassam Falls': [
      { name: "Dassam Prasad", role: "Waterfall Guide", phone: "2345XXX678" },
      { name: "Laxmi Devi", role: "Tourist Safety", phone: "75XX12XXX" },
      { name: "Dassam Control Room", role: "Emergency Response", phone: "101XX" }
    ],
    'Lodh Falls': [
      { name: "Lodh Singh", role: "Nature Guide", phone: "1234XXX567" },
      { name: "Sarita Kumari", role: "Emergency Response", phone: "71XX34XXX" },
      { name: "Lodh Control Room", role: "Emergency Response", phone: "108XX" }
    ],
    
    // National Parks & Wildlife
    'Betla National Park': [
      { name: "Forest Ranger", role: "Wildlife Protection", phone: "9876XXX543" },
      { name: "Jungle Kumari", role: "Park Emergency", phone: "67XX98XXX" },
      { name: "Betla Control Room", role: "Forest Emergency", phone: "109XX" }
    ],
    'Hazaribagh National Park': [
      { name: "Tiger Prasad", role: "Wildlife Officer", phone: "8765XXX432" },
      { name: "Hiran Devi", role: "Park Safety", phone: "63XX21XXX" },
      { name: "HNP Control Room", role: "Emergency Response", phone: "110XX" }
    ],
    'Parasnath Wildlife Sanctuary': [
      { name: "Wildlife Warden", role: "Sanctuary Chief", phone: "7654XXX321" },
      { name: "Nature Kumari", role: "Animal Emergency", phone: "59XX76XXX" },
      { name: "PWS Control Room", role: "Emergency Response", phone: "111XX" }
    ],
    
    // Lakes & Dams
    'Maithon Dam': [
      { name: "Dam Engineer", role: "Dam Safety", phone: "6543XXX210" },
      { name: "Water Devi", role: "Lake Emergency", phone: "55XX87XXX" },
      { name: "Maithon Control Room", role: "Emergency Response", phone: "112XX" }
    ],
    'Panchet Dam': [
      { name: "Panchet Kumar", role: "Water Safety", phone: "5432XXX109" },
      { name: "River Kumari", role: "Dam Emergency", phone: "51XX43XXX" },
      { name: "Panchet Control Room", role: "Emergency Response", phone: "113XX" }
    ],
    'Dimna Lake': [
      { name: "Lake Guardian", role: "Water Sports Safety", phone: "4321XXX098" },
      { name: "Boating Devi", role: "Lake Emergency", phone: "47XX65XXX" },
      { name: "Dimna Control Room", role: "Emergency Response", phone: "114XX" }
    ],
    
    // Religious Sites & Temples
    'Baidyanath Temple': [
      { name: "Temple Pandit", role: "Temple Safety", phone: "3210XXX987" },
      { name: "Devotee Helper", role: "Pilgrim Assistance", phone: "43XX89XXX" },
      { name: "Temple Control Room", role: "Emergency Response", phone: "115XX" }
    ],
    'Jagannath Temple': [
      { name: "Jagannath Das", role: "Temple Guardian", phone: "2109XXX876" },
      { name: "Puja Kumari", role: "Religious Emergency", phone: "39XX12XXX" },
      { name: "Jagannath Control Room", role: "Emergency Response", phone: "116XX" }
    ],
    'Rajrappa Temple': [
      { name: "Rajrappa Baba", role: "Temple Priest", phone: "1098XXX765" },
      { name: "Shakti Devi", role: "Temple Emergency", phone: "35XX76XXX" },
      { name: "Rajrappa Control Room", role: "Emergency Response", phone: "117XX" }
    ],
    
    // More Waterfalls
    'Hirni Falls': [
      { name: "Hirni Guide", role: "Waterfall Safety Guide", phone: "2468XXX135" },
      { name: "Forest Devi", role: "Nature Emergency", phone: "73XX24XXX" },
      { name: "Hirni Control Room", role: "Emergency Response", phone: "120XX" }
    ],
    'Sita Falls': [
      { name: "Sita Kumar", role: "Falls Coordinator", phone: "1357XXX246" },
      { name: "Dhara Singh", role: "Safety Officer", phone: "69XX58XXX" },
      { name: "Sita Control Room", role: "Emergency Response", phone: "121XX" }
    ],
    'Usri Falls': [
      { name: "Usri Prasad", role: "Waterfall Guardian", phone: "9753XXX864" },
      { name: "Jharna Devi", role: "Tourist Safety", phone: "65XX92XXX" },
      { name: "Usri Control Room", role: "Emergency Response", phone: "122XX" }
    ],
    'Panchghagh Falls': [
      { name: "Panch Kumar", role: "Multi-tier Falls Guide", phone: "8642XXX975" },
      { name: "Ghagh Singh", role: "Adventure Safety", phone: "61XX37XXX" },
      { name: "Panchghagh Control Room", role: "Emergency Response", phone: "123XX" }
    ],
    
    // More Hill Stations & Scenic Places
    'Dalma Hills': [
      { name: "Dalma Ranger", role: "Wildlife Hill Guide", phone: "7531XXX468" },
      { name: "Elephant Devi", role: "Animal Emergency", phone: "57XX84XXX" },
      { name: "Dalma Control Room", role: "Emergency Response", phone: "124XX" }
    ],
    'Tagore Hill': [
      { name: "Tagore Kumar", role: "Hill Station Manager", phone: "6420XXX357" },
      { name: "Kavi Singh", role: "Cultural Guide", phone: "53XX71XXX" },
      { name: "Tagore Control Room", role: "Emergency Response", phone: "125XX" }
    ],
    'Trikut Hills': [
      { name: "Trikut Pandit", role: "Sacred Hill Guide", phone: "5319XXX642" },
      { name: "Tirth Devi", role: "Pilgrimage Safety", phone: "49XX16XXX" },
      { name: "Trikut Control Room", role: "Emergency Response", phone: "126XX" }
    ],
    
    // More Cities & Urban Areas
    'Giridih': [
      { name: "Giri Prasad", role: "City Emergency Officer", phone: "4208XXX531" },
      { name: "Dih Kumari", role: "Tourist Assistance", phone: "45XX62XXX" },
      { name: "Giridih Control Room", role: "Emergency Response", phone: "127XX" }
    ],
    'Daltonganj': [
      { name: "Dalton Singh", role: "District Emergency", phone: "3197XXX420" },
      { name: "Ganj Devi", role: "Local Coordinator", phone: "41XX93XXX" },
      { name: "Daltonganj Control Room", role: "Emergency Response", phone: "128XX" }
    ],
    'Chaibasa': [
      { name: "Chai Kumar", role: "Tribal Area Guide", phone: "2086XXX319" },
      { name: "Basa Singh", role: "Cultural Emergency", phone: "37XX48XXX" },
      { name: "Chaibasa Control Room", role: "Emergency Response", phone: "129XX" }
    ],
    'Dumka': [
      { name: "Dum Prasad", role: "Regional Coordinator", phone: "1975XXX208" },
      { name: "Ka Devi", role: "Area Emergency", phone: "33XX75XXX" },
      { name: "Dumka Control Room", role: "Emergency Response", phone: "130XX" }
    ],
    'Godda': [
      { name: "God Kumar", role: "District Safety Officer", phone: "0864XXX197" },
      { name: "Da Singh", role: "Tourist Help", phone: "29XX52XXX" },
      { name: "Godda Control Room", role: "Emergency Response", phone: "131XX" }
    ],
    'Sahebganj': [
      { name: "Saheb Ganj", role: "Border Area Guide", phone: "9753XXX086" },
      { name: "River Devi", role: "Water Emergency", phone: "25XX86XXX" },
      { name: "Sahebganj Control Room", role: "Emergency Response", phone: "132XX" }
    ],
    
    // More Dams & Water Bodies
    'Kanke Dam': [
      { name: "Kanke Engineer", role: "Dam Maintenance", phone: "8642XXX975" },
      { name: "Water Kumar", role: "Lake Safety", phone: "21XX39XXX" },
      { name: "Kanke Control Room", role: "Emergency Response", phone: "133XX" }
    ],
    'Getalsud Dam': [
      { name: "Getal Engineer", role: "Water Management", phone: "7531XXX864" },
      { name: "Sud Devi", role: "Dam Emergency", phone: "17XX64XXX" },
      { name: "Getalsud Control Room", role: "Emergency Response", phone: "134XX" }
    ],
    'Tenughat Dam': [
      { name: "Tenu Ghat", role: "Hydroelectric Safety", phone: "6420XXX753" },
      { name: "Power Singh", role: "Technical Emergency", phone: "13XX97XXX" },
      { name: "Tenughat Control Room", role: "Emergency Response", phone: "135XX" }
    ],
    'Tilaiya Dam': [
      { name: "Til Kumar", role: "Dam Operations", phone: "5319XXX642" },
      { name: "Aiya Devi", role: "Water Safety", phone: "09XX42XXX" },
      { name: "Tilaiya Control Room", role: "Emergency Response", phone: "136XX" }
    ],
    
    // More Wildlife & Nature Areas
    'Dalma Wildlife Sanctuary': [
      { name: "Dalma Warden", role: "Wildlife Protection", phone: "4208XXX531" },
      { name: "Sanctuary Devi", role: "Animal Emergency", phone: "05XX75XXX" },
      { name: "DWS Control Room", role: "Emergency Response", phone: "137XX" }
    ],
    'Koderma Wildlife Sanctuary': [
      { name: "Kod Ranger", role: "Forest Officer", phone: "3197XXX420" },
      { name: "Erma Singh", role: "Wildlife Emergency", phone: "01XX28XXX" },
      { name: "KWS Control Room", role: "Emergency Response", phone: "138XX" }
    ],
    'Gautam Buddha Wildlife Sanctuary': [
      { name: "Buddha Keeper", role: "Sanctuary Chief", phone: "2086XXX319" },
      { name: "Gautam Devi", role: "Nature Protection", phone: "97XX51XXX" },
      { name: "GBWS Control Room", role: "Emergency Response", phone: "139XX" }
    ],
    'Lawalong Wildlife Sanctuary': [
      { name: "Lawa Long", role: "Forest Guardian", phone: "1975XXX208" },
      { name: "Wild Singh", role: "Animal Safety", phone: "93XX84XXX" },
      { name: "LWS Control Room", role: "Emergency Response", phone: "140XX" }
    ],
    
    // More Temples & Religious Sites
    'Baba Baidyanath Temple': [
      { name: "Baba Pandit", role: "Head Priest", phone: "0864XXX197" },
      { name: "Baidya Devi", role: "Temple Safety", phone: "89XX17XXX" },
      { name: "Baidyanath Control Room", role: "Emergency Response", phone: "141XX" }
    ],
    'Pahari Mandir': [
      { name: "Pahari Pandit", role: "Hill Temple Guide", phone: "9753XXX086" },
      { name: "Mandir Devi", role: "Religious Emergency", phone: "85XX60XXX" },
      { name: "Pahari Control Room", role: "Emergency Response", phone: "142XX" }
    ],
    'Sun Temple': [
      { name: "Surya Kumar", role: "Sun Temple Priest", phone: "8642XXX975" },
      { name: "Deo Singh", role: "Temple Security", phone: "81XX43XXX" },
      { name: "Sun Control Room", role: "Emergency Response", phone: "143XX" }
    ],
    'Dewri Temple': [
      { name: "Dewri Das", role: "Temple Guardian", phone: "7531XXX864" },
      { name: "Mata Devi", role: "Devotee Assistance", phone: "77XX26XXX" },
      { name: "Dewri Control Room", role: "Emergency Response", phone: "144XX" }
    ],
    'Chhinnamasta Temple': [
      { name: "Chhinna Baba", role: "Tantric Guide", phone: "6420XXX753" },
      { name: "Masta Devi", role: "Temple Emergency", phone: "73XX09XXX" },
      { name: "Chhinnamasta Control Room", role: "Emergency Response", phone: "145XX" }
    ],
    
    // Recreation & Adventure Sites
    'Rock Garden': [
      { name: "Rock Kumar", role: "Garden Supervisor", phone: "5319XXX642" },
      { name: "Garden Devi", role: "Visitor Safety", phone: "69XX92XXX" },
      { name: "Rock Garden Control Room", role: "Emergency Response", phone: "146XX" }
    ],
    'Birsa Zoological Park': [
      { name: "Zoo Keeper", role: "Animal Care Director", phone: "4208XXX531" },
      { name: "Birsa Singh", role: "Visitor Emergency", phone: "65XX75XXX" },
      { name: "Zoo Control Room", role: "Emergency Response", phone: "147XX" }
    ],
    'Birla Mandir': [
      { name: "Birla Pandit", role: "Temple Administrator", phone: "3197XXX420" },
      { name: "Modern Devi", role: "Contemporary Temple Safety", phone: "61XX58XXX" },
      { name: "Birla Control Room", role: "Emergency Response", phone: "148XX" }
    ],
    'Nakshatra Van': [
      { name: "Star Kumar", role: "Planetarium Guide", phone: "2086XXX319" },
      { name: "Van Singh", role: "Science Emergency", phone: "57XX41XXX" },
      { name: "Nakshatra Control Room", role: "Emergency Response", phone: "149XX" }
    ],
    'Science Centre': [
      { name: "Science Kumar", role: "Education Officer", phone: "1975XXX208" },
      { name: "Centre Devi", role: "Facility Safety", phone: "53XX24XXX" },
      { name: "Science Control Room", role: "Emergency Response", phone: "150XX" }
    ],
    'Deer Park': [
      { name: "Deer Kumar", role: "Park Ranger", phone: "0864XXX197" },
      { name: "Park Devi", role: "Wildlife Safety", phone: "49XX07XXX" },
      { name: "Deer Park Control Room", role: "Emergency Response", phone: "151XX" }
    ],
    'Oxygen Park': [
      { name: "Oxygen Singh", role: "Environmental Guide", phone: "9753XXX086" },
      { name: "Fresh Devi", role: "Park Safety", phone: "45XX90XXX" },
      { name: "Oxygen Control Room", role: "Emergency Response", phone: "152XX" }
    ],
    
    // Historical Sites
    'Palamau Fort': [
      { name: "Fort Keeper", role: "Historical Site Guard", phone: "0987XXX654" },
      { name: "Heritage Guide", role: "Site Emergency", phone: "31XX54XXX" },
      { name: "Palamau Control Room", role: "Emergency Response", phone: "118XX" }
    ],
    'Massanjore Dam': [
      { name: "Hydro Engineer", role: "Dam Operations", phone: "9876XXX543" },
      { name: "Safety Warden", role: "Dam Emergency", phone: "27XX98XXX" },
      { name: "Massanjore Control Room", role: "Emergency Response", phone: "119XX" }
    ],
    'McCluskieganj': [
      { name: "McCluskie Kumar", role: "Anglo-Indian Heritage Guide", phone: "8642XXX975" },
      { name: "Ganj Devi", role: "Cultural Emergency", phone: "41XX73XXX" },
      { name: "McCluskieganj Control Room", role: "Emergency Response", phone: "153XX" }
    ],
    'Tribal Research Institute Museum': [
      { name: "Museum Curator", role: "Cultural Preservation Officer", phone: "7531XXX864" },
      { name: "Research Devi", role: "Institute Safety", phone: "37XX56XXX" },
      { name: "TRI Control Room", role: "Emergency Response", phone: "154XX" }
    ]
  };

  return placeSpecificNames[placeName as keyof typeof placeSpecificNames] || contacts;
};

export function EmergencyContacts({ placeName, className = "" }: EmergencyContactsProps) {
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const [isDesktopPanelOpen, setIsDesktopPanelOpen] = useState(false);
  const contacts = generateEmergencyContacts(placeName);

  const ContactCard = ({ contact, isInModal = false }: { contact: EmergencyContact; isInModal?: boolean }) => (
    <div 
      className={`group p-4 rounded-xl transition-all duration-300 cursor-pointer border-2 ${
        isInModal 
          ? 'bg-gradient-to-br from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100 border-orange-200 hover:border-orange-300' 
          : 'bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 border-white/20 hover:border-white/30 hover:shadow-lg hover:scale-105 backdrop-blur-sm transform hover:-translate-y-1'
      }`}
    >
      <a href={`tel:${contact.phone}`} className="block">
        <div className="flex items-start gap-3">
          <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-md group-hover:shadow-lg ${
            isInModal 
              ? 'bg-gradient-to-br from-orange-500 to-red-500 group-hover:from-orange-600 group-hover:to-red-600'
              : 'bg-gradient-to-br from-yellow-400 to-orange-500 group-hover:from-yellow-300 group-hover:to-orange-400'
          }`}>
            <Phone className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className={`font-semibold text-sm transition-colors drop-shadow-sm ${
              isInModal 
                ? 'text-gray-800 group-hover:text-gray-900'
                : 'text-white group-hover:text-blue-50'
            }`}>
              {contact.name}
            </h4>
            <p className={`text-xs mb-1 transition-colors font-medium ${
              isInModal 
                ? 'text-orange-700 group-hover:text-orange-800'
                : 'text-blue-100 group-hover:text-blue-50 drop-shadow-sm'
            }`}>
              {contact.role}
            </p>
            <div className={`flex items-center gap-1 font-mono text-sm transition-colors font-semibold ${
              isInModal 
                ? 'text-red-700 group-hover:text-red-800'
                : 'text-blue-100 group-hover:text-white drop-shadow-sm'
            }`}>
              <Phone className="w-3 h-3" />
              <span>{contact.phone}</span>
            </div>
          </div>
        </div>
      </a>
    </div>
  );

  return (
    <>
      {/* Desktop Version - Interactive Floating Button with Expandable Panel */}
      <div className={`hidden lg:block ${className}`}>
        <div className="fixed left-6 bottom-6 z-50">
          {/* Main Floating Button */}
          <div className="relative">
            <Button
              onClick={() => setIsDesktopPanelOpen(!isDesktopPanelOpen)}
              className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 via-red-600 to-red-700 hover:from-red-400 hover:via-red-500 hover:to-red-600 shadow-2xl border-4 border-white hover:scale-110 transition-all duration-300 group relative overflow-hidden"
              size="lg"
            >
              {/* Animated background pulse */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/30 to-orange-500/30 rounded-full animate-ping"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-full"></div>
              
              {/* Icon and text */}
              <div className="relative z-10 flex flex-col items-center gap-1">
                <div className="text-2xl animate-bounce">🚨</div>
                <span className="text-xs font-bold text-white drop-shadow-sm">Emergency</span>
              </div>
              
              {/* Ripple effect on hover */}
              <div className="absolute inset-0 rounded-full bg-white/20 transform scale-0 group-hover:scale-100 transition-transform duration-500 ease-out"></div>
            </Button>
            
            {/* Floating notification badge */}
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <span className="text-xs font-bold text-white">{contacts.length}</span>
            </div>
          </div>
        </div>
        
        {/* Expandable Contact Panel */}
        {isDesktopPanelOpen && (
          <div className="fixed left-6 bottom-24 z-40">
            <div className="animate-in slide-in-from-left-5 fade-in duration-300">
              <Card className="w-96 bg-white/95 backdrop-blur-xl shadow-2xl border border-gray-200/50 rounded-2xl overflow-hidden">
                {/* Header with close button */}
                <CardHeader className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white pb-3 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/90 via-red-600/90 to-red-700/90"></div>
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-yellow-400/30 to-orange-500/30 rounded-full blur-xl"></div>
                  
                  <div className="relative z-10 flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg">
                        <span className="text-xl">🚨</span>
                      </div>
                      <div>
                        <div className="text-lg font-bold">Emergency Contacts</div>
                        <div className="text-sm text-red-100 font-medium">{placeName} Area</div>
                      </div>
                    </CardTitle>
                    <Button
                      onClick={() => setIsDesktopPanelOpen(false)}
                      variant="ghost"
                      size="sm"
                      className="text-white hover:text-red-200 hover:bg-red-600/30 p-2 h-8 w-8 rounded-full transition-all duration-300 hover:scale-110"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="p-4 space-y-3 max-h-80 overflow-y-auto">
                  {contacts.map((contact, index) => (
                    <div key={index} className="animate-in slide-in-from-left duration-300" style={{ animationDelay: `${index * 100}ms` }}>
                      <ContactCard contact={contact} isInModal />
                    </div>
                  ))}
                  
                  <div className="mt-4 pt-3 border-t border-gray-200 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-3">
                    <p className="text-red-700 text-sm text-center font-semibold">
                      ⚠️ Tap any contact to call immediately
                    </p>
                    <p className="text-red-600 text-xs text-center mt-1">
                      24/7 Emergency services available
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Version - Floating Button */}
      <div className="lg:hidden fixed bottom-6 left-4 z-50">
        <Button
          onClick={() => setIsMobileModalOpen(true)}
          className="bg-red-600 hover:bg-red-700 text-white shadow-2xl rounded-full p-4 h-auto min-w-0 border-2 border-red-500 hover:scale-110 transition-all duration-300 animate-pulse"
          size="lg"
        >
          <div className="flex flex-col items-center gap-1">
            <span className="text-xl">🚨</span>
            <span className="text-xs font-semibold">Emergency</span>
          </div>
        </Button>
      </div>

      {/* Mobile Modal */}
      <Dialog open={isMobileModalOpen} onOpenChange={setIsMobileModalOpen}>
        <DialogContent className="max-w-sm mx-auto bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white border-0 rounded-2xl">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-white flex items-center gap-2 text-lg font-bold">
                <span className="text-2xl animate-pulse">🚨</span>
                Emergency Contacts
              </DialogTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileModalOpen(false)}
                className="text-white hover:text-red-200 hover:bg-red-600/20 p-1 h-8 w-8 rounded-full"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-red-100 text-sm font-medium">{placeName} Area</p>
          </DialogHeader>
          
          <div className="space-y-3 pt-2">
            {contacts.map((contact, index) => (
              <ContactCard key={index} contact={contact} isInModal />
            ))}
            
            <div className="mt-6 pt-4 border-t border-red-500 text-center">
              <p className="text-red-100 text-xs">
                ⚠️ Tap any contact to call for immediate help
              </p>
              <p className="text-red-200 text-xs mt-1">
                Stay safe and enjoy your visit!
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
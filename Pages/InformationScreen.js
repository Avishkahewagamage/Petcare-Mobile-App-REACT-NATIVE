import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
  Dimensions,
} from 'react-native';
import { Card, Button } from 'react-native-elements';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import Background from '../Background'; // Your existing Background component

const { width, height } = Dimensions.get('window');

const InformationScreen = () => {
  // State to track the selected category
  const [selectedCategory, setSelectedCategory] = useState('Feeding');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState(null);

  // Categories and their respective icons
  const categories = [
    { name: 'Feeding', icon: 'food', type: 'MaterialCommunityIcons' },
    { name: 'Grooming', icon: 'scissors', type: 'FontAwesome5' },
    { name: 'Health', icon: 'heartbeat', type: 'FontAwesome5' },
    { name: 'Exercise', icon: 'run', type: 'MaterialCommunityIcons' },
    { name: 'Training', icon: 'dog', type: 'MaterialCommunityIcons' },
    { name: 'Behavior', icon: 'emoticon-happy-outline', type: 'MaterialCommunityIcons' },
    { name: 'Veterinary', icon: 'hospital-box', type: 'MaterialCommunityIcons' },
    { name: 'Nutrition', icon: 'nutrition', type: 'MaterialCommunityIcons' },
  ];

  // Sample data for different categories
  const data = {
    Feeding: [
      {
        title: 'Puppy Nutrition',
        content:
          'Puppies need high-calorie diets to support growth. They require a balanced diet of proteins, fats, carbohydrates, vitamins, and minerals. It’s important to choose high-quality puppy food, specifically designed for their developmental needs. Provide small, frequent meals to keep their energy levels stable. Remember, each breed has specific nutritional requirements. Consulting with a veterinarian for personalized feeding advice is recommended.',
      },
      {
        title: 'Adult Dog Feeding',
        content:
          'Adult dogs require balanced nutrition to maintain health and energy. A proper diet includes the right mix of proteins, fats, carbohydrates, vitamins, and minerals. Choose a high-quality dog food and adjust the portion sizes according to your dog’s size, age, and activity level. Be cautious with human food and treats, as they can lead to obesity and other health issues. Regularly consulting with a veterinarian for tailored advice is wise.',
      },
      {
        title: 'Senior Dog Nutrition',
        content:
          'As dogs age, their nutritional needs change. Senior dogs may require diets lower in calories but higher in fiber, vitamins, and minerals to maintain health and manage weight. Opt for senior-specific dog food that caters to older dogs\' metabolism and digestion. Include supplements like glucosamine and omega-3 fatty acids to support joint health. Regular vet check-ups can help adjust diet as needed.',
      },
      {
        title: 'Special Diets for Dogs',
        content:
          'Some dogs may need special diets due to allergies, medical conditions, or weight issues. Grain-free diets can be beneficial for dogs with grain allergies, while low-fat diets can help manage pancreatitis. Veterinary-prescribed diets are essential for conditions like kidney disease or diabetes. Always consult with a vet before making significant changes to your dog’s diet.',
      },
      {
        title: 'Homemade Dog Food',
        content:
          'Making homemade dog food allows you to control ingredients and ensure quality. Combine proteins, carbohydrates, and vegetables for balanced nutrition. Be cautious of foods toxic to dogs, like onions and chocolate. Consult with a veterinarian or a pet nutritionist to ensure homemade meals meet your dog’s nutritional requirements. Homemade treats can also be a healthy alternative.',
      },
    ],
    Grooming: [
      {
        title: 'Brushing Techniques',
        content:
          'Regular brushing keeps your pet’s coat healthy and reduces shedding. Choose the right brush for your pet’s coat type—bristle brushes for short-haired pets and slicker brushes for long-haired breeds. Brush in the direction of hair growth to prevent irritation. Regular brushing helps distribute natural oils, improves circulation, and reduces tangles and mats. It’s also an opportunity to check for skin problems and pests.',
      },
      {
        title: 'Bathing Tips',
        content:
          'Learn the best practices for bathing your pet. Use pet-specific shampoos and conditioners to maintain coat health. Ensure the water temperature is comfortable. Be gentle around the face and ears, and thoroughly rinse off shampoo to avoid irritation. Dry your pet with a soft towel and brush their coat to prevent mats. Bathing frequency depends on breed and lifestyle; typically, once a month is ideal.',
      },
      {
        title: 'Nail Clipping',
        content:
          'Keeping your pet’s nails trimmed is crucial for their comfort and health. Use proper nail clippers and be cautious not to cut too close to the quick, which can cause pain and bleeding. Regular trimming prevents overgrown nails and reduces the risk of injury. If unsure, seek professional grooming services to ensure nails are clipped safely.',
      },
      {
        title: 'Ear Cleaning',
        content:
          'Regular ear cleaning helps prevent infections and maintain ear health. Use vet-recommended ear cleaning solutions and cotton balls or pads. Gently clean the outer ear and avoid inserting anything into the ear canal. Regularly check for signs of infection, such as redness, odor, or excessive wax. Consult with a veterinarian if you notice any unusual symptoms.',
      },
      {
        title: 'Teeth Brushing',
        content:
          'Dental care is vital for pets\' overall health. Use pet-specific toothbrushes and toothpaste to maintain oral hygiene. Regular brushing prevents plaque buildup, reduces the risk of dental diseases, and promotes fresh breath. Dental chews and toys can supplement brushing efforts. Regular dental check-ups with a veterinarian ensure healthy teeth and gums.',
      },
    ],
    Health: [
      {
        title: 'Vaccination Schedule',
        content:
          'Keep your pets vaccinated on schedule to prevent diseases. Core vaccines include rabies, distemper, parvovirus, and adenovirus for dogs, and rabies, feline distemper, feline herpesvirus, and calicivirus for cats. Your veterinarian will advise on non-core vaccines based on your pet’s lifestyle and geographic location. Regular booster shots are necessary to maintain immunity. Keeping a vaccination record is essential.',
      },
      {
        title: 'Common Illnesses',
        content:
          'Recognize and treat common pet illnesses such as ear infections, worms, fleas, and ticks. Symptoms like excessive scratching, licking, or shaking of the head may indicate ear infections. Parasites like worms require prompt treatment with vet-recommended dewormers. Fleas and ticks can be controlled with topical or oral treatments. Regular veterinary check-ups ensure early detection and treatment of illnesses.',
      },
      {
        title: 'Preventative Care',
        content:
          'Preventative care is crucial for maintaining your pet’s health. Schedule regular vet visits, keep vaccinations up-to-date, and provide routine parasite control. Maintain a balanced diet and regular exercise. Monitor your pet for any changes in behavior or health. Early detection and prevention are key to avoiding serious health issues.',
      },
      {
        title: 'Dental Health',
        content:
          'Dental health is an essential aspect of overall well-being for pets. Brush their teeth regularly with pet-safe toothpaste to prevent plaque and tartar buildup. Offer dental chews and toys to promote oral hygiene. Regular dental check-ups with your veterinarian help identify and address dental issues early, ensuring healthy teeth and gums.',
      },
      {
        title: 'Signs of Illness',
        content:
          'Being aware of signs of illness in your pet can lead to prompt treatment and recovery. Look for changes in appetite, lethargy, vomiting, diarrhea, or unusual behavior. Any persistent symptoms should be addressed by a veterinarian. Early intervention can prevent more severe health problems and ensure your pet receives timely care.',
      },
    ],
    Exercise: [
      {
        title: 'Daily Walks',
        content:
          'Walking your dog helps maintain health, reduces boredom, and promotes socialization. Choose the right leash and harness for safety and comfort. Start with shorter walks, gradually increasing the duration. Allow your dog to explore but maintain control. Regular walks prevent obesity, improve cardiovascular health, and provide mental stimulation. Aim for at least 30 minutes of walking daily, adjusting based on your dog’s breed and energy level.',
      },
      {
        title: 'Playtime Activities',
        content:
          'Engage your pet with fun activities like fetch, tug-of-war, and puzzle toys. Playing keeps pets mentally and physically active, strengthening your bond. Use interactive toys to challenge their problem-solving skills. Vary the activities to keep them exciting and adjust based on your pet’s age and preferences. Regular playtime enhances obedience, reduces anxiety, and promotes overall well-being.',
      },
      {
        title: 'Agility Training',
        content:
          'Agility training is a great way to challenge your pet both mentally and physically. Set up obstacle courses using tunnels, jumps, and weave poles. Training sessions improve coordination, focus, and obedience. Agility training can be a fun bonding experience for both you and your pet. Consider joining local agility classes or competitions for additional challenges.',
      },
      {
        title: 'Swimming',
        content:
          'Swimming is an excellent low-impact exercise for pets. It helps build muscle strength, improve cardiovascular health, and provide a refreshing activity during hot weather. Ensure your pet is comfortable in water and supervise swimming sessions. Use pet-friendly pools or safe natural water bodies. Introduce swimming gradually and provide breaks to avoid exhaustion.',
      },
      {
        title: 'Interactive Games',
        content:
          'Interactive games like hide-and-seek, fetch, and scent work provide mental stimulation and physical exercise. Use toys, treats, or your voice to engage your pet in fun challenges. Rotate games to keep them exciting and adjust difficulty based on your pet’s abilities. Interactive play enhances problem-solving skills and strengthens the bond between you and your pet.',
      },
    ],
    Training: [
      {
        title: 'Basic Commands',
        content:
          'Teach your dog basic commands like sit, stay, come, and heel. Use positive reinforcement techniques such as treats, praise, and play. Consistency and patience are key. Start with short training sessions and gradually increase their duration. Training improves communication, enhances safety, and strengthens your relationship with your pet. It’s essential for well-behaved pets in various environments.',
      },
      {
        title: 'House Training',
        content:
          'Effective strategies for house training include establishing a routine, rewarding good behavior, and using crate training. Take your pet outside frequently, especially after meals and naps. Use verbal cues and praise for successful potty trips. Avoid punishment for accidents, as it can lead to fear and confusion. Consistency, patience, and positive reinforcement are vital for successful house training.',
      },
      {
        title: 'Leash Training',
        content:
          'Leash training teaches your dog to walk calmly on a leash without pulling. Use positive reinforcement to encourage good behavior. Start with short walks, gradually increasing duration and complexity. Teach commands like "heel" and "leave it" for better control. Consistent leash training improves safety during walks and enhances your pet’s ability to enjoy outdoor adventures.',
      },
      {
        title: 'Advanced Commands',
        content:
          'Building on basic commands, teach advanced commands like "roll over," "play dead," and "shake hands." Use clicker training or verbal cues to signal correct behavior. Reward with treats, praise, or play. Advanced training provides mental stimulation and enhances your pet’s responsiveness. Gradually increase the complexity of commands and practice regularly to reinforce learning.',
      },
      {
        title: 'Behavioral Training',
        content:
          'Address behavioral issues like barking, biting, or jumping with targeted training techniques. Identify triggers and use positive reinforcement to modify behavior. Consistency and patience are key to overcoming unwanted behaviors. Consult with professional trainers or behaviorists for complex issues. Behavioral training improves your pet’s behavior and ensures a harmonious living environment.',
      },
    ],
    Behavior: [
      {
        title: 'Understanding Body Language',
        content:
          'Understanding your pet’s body language helps improve communication and strengthen your bond. Learn to recognize signs of happiness, fear, aggression, or anxiety. Tail wagging, ear position, and posture can provide insights into your pet’s emotional state. Respond appropriately to their cues, and use positive reinforcement to encourage desired behaviors.',
      },
      {
        title: 'Separation Anxiety',
        content:
          'Separation anxiety is common in pets and can lead to destructive behaviors when left alone. Gradual desensitization, leaving comfort items, and maintaining a consistent routine can help alleviate anxiety. Consider using interactive toys or treats to keep your pet occupied. If needed, consult a professional for behavior modification techniques or training.',
      },
      {
        title: 'Socialization',
        content:
          'Socialization is essential for pets to develop confidence and adaptability. Introduce your pet to different environments, people, and other animals gradually. Use positive reinforcement to encourage calm and friendly behavior. Socialization helps prevent fear and aggression, leading to a well-adjusted pet that enjoys diverse experiences.',
      },
      {
        title: 'Positive Reinforcement',
        content:
          'Positive reinforcement involves rewarding desired behaviors to encourage repetition. Use treats, praise, or play as rewards. Timing and consistency are key for effective reinforcement. Positive reinforcement strengthens the bond between you and your pet and enhances their learning experience. Avoid punishment, as it can lead to fear and hinder learning.',
      },
      {
        title: 'Addressing Aggression',
        content:
          'Aggression in pets can stem from fear, territorial instincts, or lack of socialization. Identifying triggers and providing proper training can help manage aggressive behavior. Seek professional guidance if needed. Consistent training, positive reinforcement, and patience are vital for addressing aggression and ensuring a safe environment for your pet and others.',
      },
    ],
    Veterinary: [
      {
        title: 'Finding the Right Veterinarian',
        content:
          'Choosing a trustworthy veterinarian is essential for your pet’s health. Look for recommendations, visit clinics, and assess their facilities and services. Consider factors like location, hours, and emergency care availability. Building a strong relationship with your veterinarian ensures comprehensive and reliable healthcare for your pet.',
      },
      {
        title: 'Regular Check-ups',
        content:
          'Regular veterinary check-ups are crucial for monitoring your pet’s health and catching potential issues early. Schedule annual or semi-annual visits, depending on your pet’s age and health status. Vaccinations, dental care, and parasite prevention are essential components of regular check-ups. Keep track of your pet’s health records and communicate any concerns with your veterinarian.',
      },
      {
        title: 'Emergency Care',
        content:
          'Knowing how to handle emergencies is essential for pet owners. Familiarize yourself with local emergency veterinary services and have their contact information readily available. Learn basic first aid techniques for pets, such as CPR and wound care. Quick response in emergencies can make a significant difference in your pet’s outcome.',
      },
      {
        title: 'Specialist Care',
        content:
          'Some pets may require specialist care for specific health issues. Specialists, such as dermatologists, cardiologists, or behaviorists, provide expertise in their respective fields. Consult with your veterinarian for referrals to specialists if your pet requires advanced care. Specialist care ensures your pet receives tailored treatment for complex conditions.',
      },
      {
        title: 'Health Monitoring',
        content:
          'Monitoring your pet’s health involves observing their behavior, appetite, and physical condition. Keep track of changes in weight, coat quality, or energy levels. Regularly check for lumps, bumps, or unusual symptoms. Health monitoring helps detect issues early and allows for timely intervention. Collaborate with your veterinarian for comprehensive health management.',
      },
    ],
    Nutrition: [
      {
        title: 'Balanced Diets',
        content:
          'A balanced diet is essential for your pet’s overall health. Ensure their meals include proteins, fats, carbohydrates, vitamins, and minerals in appropriate proportions. Choose high-quality commercial pet food or consult with a veterinarian for homemade diet recommendations. Balanced diets support growth, energy, and well-being.',
      },
      {
        title: 'Understanding Pet Food Labels',
        content:
          'Understanding pet food labels helps you make informed decisions about your pet’s nutrition. Look for key ingredients, nutritional content, and feeding guidelines. Choose food that meets AAFCO standards for complete and balanced nutrition. Avoid products with excessive fillers or artificial additives. Proper label interpretation ensures your pet receives optimal nutrition.',
      },
      {
        title: 'Food Allergies',
        content:
          'Food allergies can lead to digestive issues, skin problems, or behavioral changes in pets. Identify allergens through elimination diets or allergy tests. Common allergens include grains, dairy, and certain proteins. Provide hypoallergenic or limited-ingredient diets as recommended by your veterinarian. Managing food allergies improves your pet’s comfort and quality of life.',
      },
      {
        title: 'Feeding Guidelines',
        content:
          'Following feeding guidelines ensures your pet receives the appropriate amount of food for their age, size, and activity level. Measure portions accurately and adjust based on weight and condition. Avoid overfeeding, as it can lead to obesity and related health issues. Consult with your veterinarian for personalized feeding advice based on your pet’s specific needs.',
      },
      {
        title: 'Supplementation',
        content:
          'Supplements can enhance your pet’s diet by providing additional nutrients or addressing specific health needs. Common supplements include omega-3 fatty acids, glucosamine, and probiotics. Consult with a veterinarian before introducing supplements to ensure they are safe and beneficial for your pet. Proper supplementation supports overall health and well-being.',
      },
    ],
  };

  // Function to handle "Learn More" button click
  const handleLearnMore = (item) => {
    setSelectedInfo(item);
    setModalVisible(true);
  };

  return (
    <Background>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Category Navigation */}
        <View style={styles.categoryContainer}>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.categoryButton,
                selectedCategory === category.name && styles.selectedCategory,
              ]}
              onPress={() => setSelectedCategory(category.name)}
            >
              {category.type === 'MaterialCommunityIcons' && (
                <MaterialCommunityIcons
                  name={category.icon}
                  size={24}
                  color={selectedCategory === category.name ? '#fff' : '#000'}
                />
              )}
              {category.type === 'FontAwesome5' && (
                <FontAwesome5
                  name={category.icon}
                  size={24}
                  color={selectedCategory === category.name ? '#fff' : '#000'}
                />
              )}
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category.name && styles.selectedCategoryText,
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Displaying Information */}
        <View style={styles.infoContainer}>
          {data[selectedCategory].map((item, index) => (
            <Card key={index} containerStyle={styles.card}>
              <Card.Title style={styles.cardTitle}>{item.title}</Card.Title>
              <Card.Divider />
              <Text style={styles.cardContent}>{item.content.slice(0, 100)}...</Text>
              <Button
                title="Learn More"
                buttonStyle={styles.learnMoreButton}
                onPress={() => handleLearnMore(item)}
              />
            </Card>
          ))}
        </View>

        {/* Modal for Detailed Information */}
        {selectedInfo && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <ScrollView>
                  <Text style={styles.modalTitle}>{selectedInfo.title}</Text>
                  <Text style={styles.modalContent}>{selectedInfo.content}</Text>
                </ScrollView>
                <Pressable
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        )}
      </ScrollView>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingBottom: 60,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  categoryButton: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
  },
  selectedCategory: {
    backgroundColor: '#4CAF50',
  },
  categoryText: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: '600',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  infoContainer: {
    marginTop: 10,
  },
  card: {
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    marginVertical: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  cardContent: {
    fontSize: 14,
    color: '#333',
    marginVertical: 10,
  },
  learnMoreButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: width * 0.85,
    maxHeight: height * 0.7,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
  },
  modalContent: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default InformationScreen;

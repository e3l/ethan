// Work and team experience, most recent first.
//
//   name    organisation
//   role    my role there
//   logo    the organisation's logo
//   accent  the organisation's brand colour
//   stack   technologies and skills
//   blurb   optional; paragraphs about what I worked on
//   photos  optional; images from the work

import tesla from '../components/portfolio/tesla.png'
import rapyuta from '../components/portfolio/rapyuta-light.png'
import gtri from '../components/portfolio/gtri.png'
import mitre from '../components/portfolio/mitre.png'
import grt from '../components/portfolio/grt.png'
import kurio from '../components/portfolio/kurio.png'

export const experiences = [
    {
        name: 'Tesla',
        role: 'Computer Vision & Data',
        logo: tesla,
        accent: '#e82127',
        stack: ['AWS S3', 'SQL', 'Kafka', 'Kubernetes', 'C#/.NET'],
    },
    {
        name: 'Rapyuta Robotics',
        role: 'Robotics Perception & Systems',
        logo: rapyuta,
        accent: '#e2231a',
        stack: [
            'Python',
            'PyTorch',
            'GStreamer',
            'OpenCV',
            'TensorRT',
            'Transformer Object Detection',
            'ROS/ROS 2',
            'C++',
            'Docker Compose',
            'Linux',
            'Networking',
            'Ansible',
            'Grafana',
        ],
    },
    {
        name: 'Georgia Tech Research Institute',
        role: 'Robotics Simulation',
        logo: gtri,
        accent: '#b3a369',
        stack: ['ROS', 'catkin', 'Gazebo', 'SLAM'],
    },
    {
        name: 'MITRE Corporation',
        role: 'Deep Learning Research',
        logo: mitre,
        accent: '#005b94',
        stack: ['Cybersecurity', 'Computer Vision', 'Generative Adversarial Networks'],
    },
    {
        name: 'Gunn Robotics Team',
        role: 'Controls Team Lead',
        logo: grt,
        accent: '#ed1c24',
        stack: [
            'Jetson Nano',
            'GStreamer H.264 streaming',
            'Electronics',
            'Soldering',
            'Java',
            'Recruiting & Mentorship',
            'Design/Systems Integration',
            'Logistics & Purchasing & Coordination',
        ],
    },
    {
        name: 'Kuriosity Robotics',
        role: 'Software Team Lead',
        logo: kurio,
        accent: '#ef2b2d',
        stack: [
            'Multi-threaded software architecture',
            'SLAM',
            'Kalman Filter Sensor Fusion',
            'Path Planning',
            'Control Systems',
            'TensorFlow',
            'Java',
            'Mentorship & Leadership',
        ],
    },
]

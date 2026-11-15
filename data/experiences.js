// Work and team experience, most recent first. Read by the portfolio and the
// home gallery.
//
//   slug       URL name; /portfolio#tesla
//   name       organisation
//   role       my role there
//   logo       the organisation's logo
//   accent     the organisation's brand colour
//   stack      technologies and skills
//   blurb      optional; paragraphs about what I worked on
//   photos     optional; images from the work, shown on the portfolio
//   favorites  optional; home gallery photos, most important first

import tesla from '../components/portfolio/tesla.png'
import rapyuta from '../components/portfolio/rapyuta-light.png'
import gtri from '../components/portfolio/gtri.png'
import mitre from '../components/portfolio/mitre.png'
import grt from '../components/portfolio/grt.png'
import kurio from '../components/portfolio/kurio.png'

import tesla_a from '../components/gallery/tesla/a.jpg'
import tesla_b from '../components/gallery/tesla/b.jpg'
import tesla_c from '../components/gallery/tesla/c.jpg'
import tesla_d from '../components/gallery/tesla/d.jpg'
import tesla_e from '../components/gallery/tesla/e.jpg'
import tesla_f from '../components/gallery/tesla/f.jpg'
import tesla_g from '../components/gallery/tesla/g.jpg'
import tesla_h from '../components/gallery/tesla/h.jpg'

import rapyuta_a from '../components/gallery/rapyuta/a.jpg'
import rapyuta_b from '../components/gallery/rapyuta/b.jpg'
import rapyuta_c from '../components/gallery/rapyuta/c.jpg'
import rapyuta_d from '../components/gallery/rapyuta/d.jpg'
import rapyuta_e from '../components/gallery/rapyuta/e.jpg'
import rapyuta_f from '../components/gallery/rapyuta/f.jpg'
import rapyuta_g from '../components/gallery/rapyuta/g.jpg'
import rapyuta_h from '../components/gallery/rapyuta/h.jpg'
import rapyuta_i from '../components/gallery/rapyuta/i.jpg'
import rapyuta_j from '../components/gallery/rapyuta/j.jpg'
import rapyuta_k from '../components/gallery/rapyuta/k.jpg'
import rapyuta_l from '../components/gallery/rapyuta/l.jpg'
import rapyuta_m from '../components/gallery/rapyuta/m.jpg'
import rapyuta_n from '../components/gallery/rapyuta/n.jpg'
import rapyuta_o from '../components/gallery/rapyuta/o.jpg'
import rapyuta_p from '../components/gallery/rapyuta/p.jpg'
import rapyuta_q from '../components/gallery/rapyuta/q.jpg'

import grt_a from '../components/gallery/grt/a.jpg'
import grt_b from '../components/gallery/grt/b.jpg'
import grt_c from '../components/gallery/grt/c.jpg'
import grt_d from '../components/gallery/grt/d.jpg'
import grt_e from '../components/gallery/grt/e.jpg'
import grt_f from '../components/gallery/grt/f.jpg'
import grt_g from '../components/gallery/grt/g.jpg'

import kurio_a from '../components/gallery/kurio/a.jpg'
import kurio_b from '../components/gallery/kurio/b.jpg'
import kurio_c from '../components/gallery/kurio/c.jpg'
import kurio_d from '../components/gallery/kurio/d.jpg'
import kurio_e from '../components/gallery/kurio/e.jpg'
import kurio_f from '../components/gallery/kurio/f.jpg'
import kurio_g from '../components/gallery/kurio/g.jpg'

export const experiences = [
    {
        slug: 'tesla',
        name: 'Tesla',
        role: 'Computer Vision & Data',
        logo: tesla,
        accent: '#e82127',
        stack: ['AWS S3', 'SQL', 'Kafka', 'Kubernetes', 'C#/.NET'],
        favorites: [tesla_a, tesla_b, tesla_c, tesla_d, tesla_e, tesla_g, tesla_h, tesla_f],
    },
    {
        slug: 'rapyuta',
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
        favorites: [
            rapyuta_a, rapyuta_b, rapyuta_c, rapyuta_d, rapyuta_e, rapyuta_f,
            rapyuta_g, rapyuta_h, rapyuta_i, rapyuta_j, rapyuta_k, rapyuta_l,
            rapyuta_m, rapyuta_n, rapyuta_o, rapyuta_p, rapyuta_q,
        ],
    },
    {
        slug: 'gtri',
        name: 'Georgia Tech Research Institute',
        role: 'Robotics Simulation',
        logo: gtri,
        accent: '#b3a369',
        stack: ['ROS', 'catkin', 'Gazebo', 'SLAM'],
    },
    {
        slug: 'mitre',
        name: 'MITRE Corporation',
        role: 'Deep Learning Research',
        logo: mitre,
        accent: '#005b94',
        stack: ['Cybersecurity', 'Computer Vision', 'Generative Adversarial Networks'],
    },
    {
        slug: 'grt',
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
        favorites: [grt_a, grt_b, grt_c, grt_d, grt_e, grt_f, grt_g],
    },
    {
        slug: 'kurio',
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
        favorites: [kurio_a, kurio_b, kurio_c, kurio_d, kurio_e, kurio_f, kurio_g],
    },
]

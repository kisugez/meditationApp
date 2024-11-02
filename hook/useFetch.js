import { useState, useEffect } from "react";

const useFetch = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bestMeditations, setBestMeditations] = useState([]);

  const meditationData = [
    {
      id: 1,
      title: "Mindful Breathing",
      description:
        "Focus on your breath and maintain a steady rhythm to clear your mind and reduce stress.",
      duration: "10 minutes",
      image:
        "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      target: "calmness",
      instructions: [
        "Sit comfortably with your back straight.",
        "Close your eyes and focus on your breathing.",
        "Inhale deeply and slowly through your nose.",
        "Exhale gently and fully through your mouth.",
        "Continue for 10 minutes, focusing solely on your breath.",
      ],
    },
    {
      id: 2,
      title: "Body Scan Meditation",
      description:
        "Scan through each part of your body, relaxing your muscles and relieving tension.",
      duration: "15 minutes",
      image:
        "https://images.unsplash.com/photo-1573384666979-2b1e160d2d08?q=80&w=1878&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      target: "relaxation",
      instructions: [
        "Lie down on a comfortable surface.",
        "Close your eyes and take deep breaths.",
        "Start by focusing on your toes, tense and relax them.",
        "Move slowly upward, relaxing each muscle group as you go.",
        "Finish by focusing on your head and neck, releasing all remaining tension.",
      ],
    },
    {
      id: 3,
      title: "Loving-Kindness Meditation",
      description:
        "Send thoughts of love and kindness to yourself and others to foster positive emotions.",
      duration: "20 minutes",
      image:
        "https://images.unsplash.com/photo-1540206063137-4a88ca974d1a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      target: "compassion",
      instructions: [
        "Sit comfortably and close your eyes.",
        "Focus on feelings of love and kindness toward yourself.",
        "Extend these feelings toward loved ones, friends, and even strangers.",
        "Mentally repeat phrases such as 'May you be happy, may you be healthy'.",
        "Continue for 20 minutes, expanding your circle of compassion.",
      ],
    },
    {
      id: 4,
      title: "Guided Visualization",
      description:
        "Visualize a peaceful scene to calm your mind and enhance focus.",
      duration: "12 minutes",
      image:
        "https://plus.unsplash.com/premium_photo-1713908832384-55726490c8e2?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      target: "mental clarity",
      instructions: [
        "Find a quiet place and sit comfortably.",
        "Close your eyes and begin by visualizing a peaceful scene, like a beach or forest.",
        "Engage all of your senses in the visualization: feel the warmth of the sun, hear the waves, etc.",
        "Focus on this image for 12 minutes to clear your mind.",
        "Slowly bring your attention back to the present when finished.",
      ],
    },
    {
      id: 5,
      title: "Mantra Meditation",
      description:
        "Repeat a calming word or phrase to quiet the mind and center yourself.",
      duration: "10 minutes",
      image:
        "https://images.unsplash.com/photo-1547852355-26c780c450f9?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      target: "inner peace",
      instructions: [
        "Choose a mantra such as 'Om' or 'peace'.",
        "Sit in a comfortable position with your eyes closed.",
        "Inhale deeply and on the exhale, repeat your mantra aloud or silently.",
        "Focus on the sound and vibration of the mantra.",
        "Continue for 10 minutes, letting the mantra guide your meditation.",
      ],
    },
    {
      id: 6,
      title: "Chakra Meditation",
      description:
        "Focus on aligning your energy centers to achieve balance and peace.",
      duration: "25 minutes",
      image:
        "https://images.unsplash.com/photo-1573590330099-d6c7355ec595?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      target: "energy balance",
      instructions: [
        "Sit in a quiet place and close your eyes.",
        "Visualize each chakra, starting from the root (base of the spine) and moving upward.",
        "Imagine a glowing light in each chakra, energizing it as you breathe in.",
        "With each exhale, visualize the chakra's light expanding.",
        "Continue focusing on all seven chakras for 25 minutes.",
      ],
    },
    {
      id: 7,
      title: "Walking Meditation",
      description:
        "Combine walking with mindfulness to bring awareness to your movement and surroundings.",
      duration: "15 minutes",
      image:
        "https://images.unsplash.com/photo-1573646985533-85d8a384e020?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      target: "mind-body connection",
      instructions: [
        "Find a peaceful location where you can walk undisturbed.",
        "Walk slowly, focusing on each step you take.",
        "Notice how your feet feel against the ground and how your body moves.",
        "Breathe deeply, matching your breaths to your steps.",
        "Continue walking mindfully for 15 minutes.",
      ],
    },
    {
      id: 8,
      title: "Zen Meditation",
      description:
        "Practice sitting meditation to develop concentration and insight.",
      duration: "30 minutes",
      image:
        "https://images.unsplash.com/photo-1554965863-e1576e9340c4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      target: "concentration",
      instructions: [
        "Sit in a cross-legged position on a cushion or chair.",
        "Keep your spine straight and hands resting in your lap.",
        "Focus your attention on your breathing or a single point in front of you.",
        "Whenever your mind wanders, gently bring your focus back to your breath.",
        "Practice for 30 minutes, developing deeper concentration.",
      ],
    },
    {
      id: 9,
      title: "Transcendental Meditation",
      description:
        "Use a specific mantra to transcend ordinary thinking and reach a deep state of relaxation.",
      duration: "20 minutes",
      image:
        "https://images.unsplash.com/photo-1591228127791-8e2eaef098d3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      target: "deep relaxation",
      instructions: [
        "Choose a personal mantra and sit comfortably.",
        "Close your eyes and begin repeating the mantra silently.",
        "Let your mind settle as you focus only on the sound of the mantra.",
        "If thoughts arise, gently return your focus to the mantra.",
        "Continue for 20 minutes, allowing your mind to transcend.",
      ],
    },
    {
      id: 10,
      title: "Progressive Muscle Relaxation",
      description:
        "Tense and relax muscle groups progressively to reduce physical tension.",
      duration: "12 minutes",
      image:
        "https://plus.unsplash.com/premium_photo-1674062861813-315f95fd012d?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      target: "physical relaxation",
      instructions: [
        "Sit or lie down in a comfortable position.",
        "Begin by tensing the muscles in your feet for 5 seconds, then relaxing them.",
        "Move upward through your legs, abdomen, arms, and face, tensing and relaxing each muscle group.",
        "Focus on the contrast between tension and relaxation in each area.",
        "Complete the sequence in 12 minutes for full-body relaxation.",
      ],
    },
  ];
  const BestMeditations = [
    {
      id: 11,
      title: "Mindful Breathing",
      description:
        "Focus on your breath and maintain a steady rhythm to clear your mind and reduce stress.",
      duration: "10 minutes",
      image:
        "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      target: "calmness",
      instructions: [
        "Sit comfortably with your back straight.",
        "Close your eyes and focus on your breathing.",
        "Inhale deeply and slowly through your nose.",
        "Exhale gently and fully through your mouth.",
        "Continue for 10 minutes, focusing solely on your breath.",
      ],
    },
    {
      id: 12,
      title: "Body Scan Meditation",
      description:
        "Scan through each part of your body, relaxing your muscles and relieving tension.",
      duration: "15 minutes",
      image:
        "https://images.unsplash.com/photo-1518458717367-249ba15389d2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      target: "relaxation",
      instructions: [
        "Lie down on a comfortable surface.",
        "Close your eyes and take deep breaths.",
        "Start by focusing on your toes, tense and relax them.",
        "Move slowly upward, relaxing each muscle group as you go.",
        "Finish by focusing on your head and neck, releasing all remaining tension.",
      ],
    },
    {
      id: 13,
      title: "Loving-Kindness Meditation",
      description:
        "Send thoughts of love and kindness to yourself and others to foster positive emotions.",
      duration: "20 minutes",
      image:
        "https://images.unsplash.com/photo-1447452001602-7090c7ab2db3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      target: "compassion",
      instructions: [
        "Sit comfortably and close your eyes.",
        "Focus on feelings of love and kindness toward yourself.",
        "Extend these feelings toward loved ones, friends, and even strangers.",
        "Mentally repeat phrases such as 'May you be happy, may you be healthy'.",
        "Continue for 20 minutes, expanding your circle of compassion.",
      ],
    },
    {
      id: 14,
      title: "Guided Visualization",
      description:
        "Visualize a peaceful scene to calm your mind and enhance focus.",
      duration: "12 minutes",
      image:
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1999&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      target: "mental clarity",
      instructions: [
        "Find a quiet place and sit comfortably.",
        "Close your eyes and begin by visualizing a peaceful scene, like a beach or forest.",
        "Engage all of your senses in the visualization: feel the warmth of the sun, hear the waves, etc.",
        "Focus on this image for 12 minutes to clear your mind.",
        "Slowly bring your attention back to the present when finished.",
      ],
    },
    {
      id: 15,
      title: "Mantra Meditation",
      description:
        "Repeat a calming word or phrase to quiet the mind and center yourself.",
      duration: "10 minutes",
      image:
        "https://images.unsplash.com/photo-1575052814074-c05122e0a17a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      target: "inner peace",
      instructions: [
        "Choose a mantra such as 'Om' or 'peace'.",
        "Sit in a comfortable position with your eyes closed.",
        "Inhale deeply and on the exhale, repeat your mantra aloud or silently.",
        "Focus on the sound and vibration of the mantra.",
        "Continue for 10 minutes, letting the mantra guide your meditation.",
      ],
    },
    {
      id: 16,
      title: "Chakra Meditation",
      description:
        "Focus on aligning your energy centers to achieve balance and peace.",
      duration: "25 minutes",
      image:
        "https://images.unsplash.com/photo-1522898467493-49726bf28798?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      target: "energy balance",
      instructions: [
        "Sit in a quiet place and close your eyes.",
        "Visualize each chakra, starting from the root (base of the spine) and moving upward.",
        "Imagine a glowing light in each chakra, energizing it as you breathe in.",
        "With each exhale, visualize the chakra's light expanding.",
        "Continue focusing on all seven chakras for 25 minutes.",
      ],
    },
    {
      id: 17,
      title: "Walking Meditation",
      description:
        "Combine walking with mindfulness to bring awareness to your movement and surroundings.",
      duration: "15 minutes",
      image:
        "https://images.unsplash.com/photo-1536922246289-88c42f957773?q=80&w=1808&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      target: "mind-body connection",
      instructions: [
        "Find a peaceful location where you can walk undisturbed.",
        "Walk slowly, focusing on each step you take.",
        "Notice how your feet feel against the ground and how your body moves.",
        "Breathe deeply, matching your breaths to your steps.",
        "Continue walking mindfully for 15 minutes.",
      ],
    },
    {
      id: 18,
      title: "Zen Meditation",
      description:
        "Practice sitting meditation to develop concentration and insight.",
      duration: "30 minutes",
      image:
        "https://images.unsplash.com/photo-1599552692549-e3ce4a23cac9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      target: "concentration",
      instructions: [
        "Sit in a cross-legged position on a cushion or chair.",
        "Keep your spine straight and hands resting in your lap.",
        "Focus your attention on your breathing or a single point in front of you.",
        "Whenever your mind wanders, gently bring your focus back to your breath.",
        "Practice for 30 minutes, developing deeper concentration.",
      ],
    },
    {
      id: 19,
      title: "Transcendental Meditation",
      description:
        "Use a specific mantra to transcend ordinary thinking and reach a deep state of relaxation.",
      duration: "20 minutes",
      image:
        "https://images.unsplash.com/photo-1611077094612-943a95a2708b?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      target: "deep relaxation",
      instructions: [
        "Choose a personal mantra and sit comfortably.",
        "Close your eyes and begin repeating the mantra silently.",
        "Let your mind settle as you focus only on the sound of the mantra.",
        "If thoughts arise, gently return your focus to the mantra.",
        "Continue for 20 minutes, allowing your mind to transcend.",
      ],
    },
    {
      id: 20,
      title: "Progressive Muscle Relaxation",
      description:
        "Tense and relax muscle groups progressively to reduce physical tension.",
      duration: "12 minutes",
      image:
        "https://images.unsplash.com/photo-1555435509-c1e95c453525?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      target: "physical relaxation",
      instructions: [
        "Sit or lie down in a comfortable position.",
        "Begin by tensing the muscles in your feet for 5 seconds, then relaxing them.",
        "Move upward through your legs, abdomen, arms, and face, tensing and relaxing each muscle group.",
        "Focus on the contrast between tension and relaxation in each area.",
        "Complete the sequence in 12 minutes for full-body relaxation.",
      ],
    },
  ];

  const fetchData = () => {
    setIsLoading(true);
    try {
      // Simulate API delay
      setTimeout(() => {
        // Combine both arrays into one
        setData(meditationData);
        setBestMeditations(BestMeditations);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      setError("Failed to fetch data");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  const getItemById = (id) => {
    const item =
      meditationData.find((meditation) => meditation.id === id) ||
      BestMeditations.find((meditation) => meditation.id === id);
    return item || null;
  };

  return { data, isLoading, error, refetch, getItemById, bestMeditations };
};

export default useFetch;

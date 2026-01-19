export default function About() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">About Me</h1>
      
      <div className="prose">
        <p>
          Hi! I'm a software developer passionate about web development, 
          TypeScript, and building useful side projects.
        </p>
        
        <p>
          This blog is where I share my thoughts, tutorials, and experiences 
          from my journey as a developer. I believe in learning by doing and 
          sharing knowledge with the community.
        </p>

        <h2>What I Write About</h2>
        <ul>
          <li>Web development with React and Next.js</li>
          <li>TypeScript best practices</li>
          <li>Building and shipping side projects</li>
          <li>Developer productivity tips</li>
        </ul>

        <h2>Get in Touch</h2>
        <p>
          Feel free to reach out! You can find me on GitHub or send me an email.
          I'm always happy to connect with fellow developers.
        </p>
      </div>
    </div>
  )
}

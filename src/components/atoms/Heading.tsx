import React from "react"

const Heading: React.FC <{tag?: string | SomeComponent, text: string}> = ({tag, text}) => {
  const Tag: string | SomeComponent = tag || "h1";
  return <Tag>{text}</Tag>
}

export default Heading;
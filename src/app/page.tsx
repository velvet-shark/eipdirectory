"use client";
import { Fragment, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

type EIP = {
  EIP: string;
  Number: string;
  Category: string;
  Title: string;
  "Custom name": string;
  Status: string;
  Created: string;
  Summary: string;
  "Why is it important?": string;
  Abstract: string;
  Motivation: string;
  Description: string;
  "Official link": string;
  "GitHub link": string;
  Links: string;
  Requires: string;
  Body: string;
};

const HomePage = () => {
  const [eips, setEips] = useState<EIP[]>([]);

  useEffect(() => {
    fetch("/eips.json")
      .then((response) => response.json())
      .then((data: EIP[]) => setEips(data))
      .catch((error) => console.error("Error fetching EIPs:", error));
  }, []);

  const StatusLabel = ({ status }: { status: string }) => {
    const getStatusColor = () => {
      switch (status) {
        case "Draft":
          return "bg-yellow-100 text-yellow-800";
        case "Review":
          return "bg-blue-100 text-blue-800";
        case "Final":
          return "bg-green-100 text-green-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    };

    return (
      <span
        className={`inline-block rounded px-2 py-1 text-xs font-semibold ${getStatusColor()}`}
      >
        {status}
      </span>
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="max-w-8xl container flex flex-col items-center justify-center gap-6 px-4 py-16">
        <h1 className="custom-h1 text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          <div className="flex items-center">
            <img
              src="/eip-logo.svg"
              alt="EIP Logo"
              className=" mr-4 h-20 w-auto sm:h-[5rem]"
            />
            <span className="custom-h1 ml-4">EIP Directory</span>
          </div>
        </h1>{" "}
        <p className="mt-4 max-w-6xl text-xl text-gray-200">
          Welcome to the Ethereum Improvement Proposal (EIP) Directory. Here you
          can find a list of important, noteworthy, interesting EIPs. Click on
          the <strong>Abstract</strong> and <strong>Motivation</strong> links to
          learn more about each proposal. More importantly, each EIP has a
          <strong> Why is it important?</strong> section that explains why the
          proposal matters and why it is included in this list.
        </p>
        <div className="max-w-8xl container mx-auto px-4 py-8">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border-b px-4 py-2 text-left align-top text-gray-800">
                    Name
                  </th>
                  <th className="border-b px-4 py-2 text-left align-top text-gray-800">
                    Description
                  </th>
                  <th className="border-b px-4 py-2 text-left align-top text-gray-800">
                    Why is it important?
                  </th>
                  <th className="border-b px-4 py-2 text-left align-top text-gray-800">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {eips.map((eip) => (
                  <Fragment key={eip.Number}>
                    <tr className="border-b border-gray-100 bg-white ">
                      <td className="px-4 py-2 align-top font-semibold text-gray-800">
                        {eip.EIP}: {eip.Title}
                      </td>
                      <td className="px-4 py-2 align-top text-gray-800">
                        {eip.Summary}
                      </td>
                      <td className="bg-purple-100 px-4 py-2 align-top text-purple-600">
                        <ReactMarkdown>
                          {eip["Why is it important?"]}
                        </ReactMarkdown>
                      </td>
                      <td className="px-4 py-2 align-top text-gray-800">
                        <StatusLabel status={eip.Status} />
                      </td>
                    </tr>
                    <tr className="border-b-2  border-purple-500 border-opacity-50 bg-white py-4">
                      <td className="border-b px-4 py-2 align-top text-gray-800">
                        <a
                          href={eip["Official link"]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Official Link
                        </a>
                        <br />
                        <a
                          href={eip["GitHub link"]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          GitHub Link
                        </a>
                      </td>
                      <td
                        colSpan={2}
                        className="border-b px-4 py-2 align-top text-gray-800"
                      >
                        <details>
                          <summary className="cursor-pointer text-blue-600">
                            Abstract
                          </summary>
                          <div className="mt-2">
                            <ReactMarkdown>{eip.Abstract}</ReactMarkdown>
                          </div>
                        </details>
                        <details>
                          <summary className="cursor-pointer text-blue-600">
                            Motivation
                          </summary>
                          <div className="mt-2">
                            <ReactMarkdown>{eip.Motivation}</ReactMarkdown>
                          </div>
                        </details>
                      </td>
                      <td className="border-b px-4 py-2 align-top text-gray-800">
                        <div className="text-sm text-gray-500">Created:</div>
                        <div className="whitespace-nowrap font-mono font-semibold text-gray-800">
                          {eip.Created}
                        </div>
                      </td>
                    </tr>
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};
export default HomePage;

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
      <div className="sm:max-w-8xl flex w-full flex-col items-center justify-center gap-4 py-8">
        <h1 className="custom-h1 px-4 text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          <div className="flex items-center">
            <img
              src="/eip-logo.svg"
              alt="EIP Logo"
              className=" mr-4 h-20 w-auto sm:h-[5rem]"
            />
            <span className="ml-1 text-[2.5rem] lg:text-[4rem]">
              EIP Directory
            </span>
          </div>
        </h1>{" "}
        <p className="text-md max-w-6xl px-4 text-gray-200  lg:mt-2 lg:text-xl">
          Welcome to the Ethereum Improvement Proposal (EIP) Directory. Here you
          can find a list of important, noteworthy, interesting EIPs. Click on
          the <strong>Abstract</strong> and <strong>Motivation</strong> links to
          learn more about each proposal. More importantly, each EIP has a
          <strong> Why is it important?</strong> section that explains why the
          proposal matters and why it is included in this list.
        </p>
        <div className="lg:max-w-8xl container mx-auto w-full lg:px-4 lg:py-2">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 overflow-hidden border border-gray-200 lg:rounded-lg">
              <thead>
                <tr className="bg-gray-100">
                  <th
                    className="border-b px-4 py-2 text-left align-top text-gray-800"
                    style={{ minWidth: "180px" }}
                  >
                    Name
                  </th>
                  <th
                    className="border-b px-4 py-2 text-left align-top text-gray-800"
                    style={{ minWidth: "150px" }}
                  >
                    Description
                  </th>
                  <th
                    className="border-b px-4 py-2 text-left align-top text-gray-800"
                    style={{ minWidth: "300px" }}
                  >
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
                        {eip["Official link"] && (
                          <a
                            href={eip["Official link"]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Official Link
                          </a>
                        )}
                        <br />
                        <a
                          href={eip["GitHub link"]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          GitHub Link
                        </a>
                        <br />
                        {eip.Links && (
                          <a
                            href={eip.Links}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {eip.Links.replace(/^https?:\/\//, "").replace(
                              /\/$/,
                              "",
                            )}
                          </a>
                        )}
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
      <footer className="mb-4 px-4 py-2 text-sm text-gray-400">
        <p>
          <img
            src="/github-mark-white.svg"
            alt="GitHub Logo"
            className="mr-1 inline h-4 w-4"
          />
          You can find the code for this project on GitHub at{" "}
          <a
            href="https://github.com/velvet-shark/eipdirectory"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            https://github.com/velvet-shark/eipdirectory
          </a>
          . Feel free to submit pull requests or open issues there.
        </p>
        <p className="mt-2">
          <img
            src="/x-logo.svg"
            alt="Twitter Logo"
            className="mr-1 inline h-4 w-4"
          />
          Follow me on Twitter{" "}
          <a
            href="https://twitter.com/velvet_shark"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            @velvet_shark
          </a>{" "}
          for more web3 and blockchain content!
        </p>
      </footer>
    </main>
  );
};
export default HomePage;

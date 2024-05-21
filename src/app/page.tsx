"use client";
import { Fragment, useEffect, useState } from "react";

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
        </h1>
        <div className="max-w-8xl container mx-auto px-4 py-8">
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
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
                      <td className="px-4 py-2 align-top text-gray-800">
                        {eip["Why is it important?"]}
                      </td>
                      <td className="px-4 py-2 align-top text-gray-800">
                        {eip.Status}
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
                          <div className="mt-2">{eip.Abstract}</div>
                        </details>
                        <details>
                          <summary className="cursor-pointer text-blue-600">
                            Motivation
                          </summary>
                          <div className="mt-2">{eip.Motivation}</div>
                        </details>
                      </td>
                      <td className="border-b px-4 py-2 align-top text-gray-800">
                        Created: {eip.Created}
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
